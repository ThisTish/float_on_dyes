"use server"


import { prisma } from "@/db/prisma"
import { formatError } from "../utils"
import { shippingAddressSchema } from "../validators"
import { getUserById } from "./users.actions"
import { ShippingAddress } from "@/types"
import { auth } from "@/auth"
import { isValid } from "zod"

// update user address
export async function updateUserAddress(data: ShippingAddress) {
	try {
		const session = await auth()
		if (!session) throw new Error('User not found')
		const user = await getUserById(session.user.id)
		if (!user) throw new Error('User not found')

		const address = shippingAddressSchema.parse(data)

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				address
			}
		})

		return { success: true, message: 'Address updated successfully' }


	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}

export async function validateShippingAddress(address: ShippingAddress) {
	try {
		const addressString = `${address.streetAddress}, ${address.subpremise ? address.subpremise + ',' : ''} ${address.city}, ${address.state}, ${address.zipCode} ${address.country}`

		const requestBody = {
			address: {
				addressLines: [addressString]
			},
			enableUspsCass: true,
		}

		const response = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.MAPS_PLATFORM_API_KEY}`,
			{
				method: 'POST',
				body: JSON.stringify(requestBody),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)

		if (!response.ok) {
			console.error('Error validating address', await response.json())
			return {
				success: false,
				message: 'Error validating address',
				originalAddress: address,
				suggestedAddress: null,
				isValid: false
			}
		}

		const data = await response.json()

		const isValid = data.result?.verdict?.addressComplete === true

		const addressData = data.result?.address?.formattedAddress
			? extractAddressComponents(data.result)
			: null

		console.log('Address validation response:', data.result.verdict)
		return {
			success: true,
			message: isValid ? 'Address is valid' : 'Address may need correction',
			originalAddress: address,
			suggestedAddress: addressData?.suggestedAddress || null,
			unconfirmedComponentTypes: addressData?.unconfirmedComponentTypes || [],
			isValid,
			location: data.result.geocode.location
		}

	} catch (error) {
		return {
			success: false,
			message: formatError(error),
			originalAddress: address,
			suggestedAddress: null,
			isValid: false
		}
	}
}

function extractAddressComponents(result: any) {
	try {
		const components = result.address?.addressComponents || []
		const postalAddress = result.address?.postalAddress || {}
		const unconfirmedComponentTypes = result.address.unconfirmedComponentTypes || []

		const streetNumber = components.find((c: any) => c.componentType === 'street_number')?.componentName.text || ''
		const route = components.find((c: any) => c.componentType === 'route')?.componentName.text || ''
		const subpremise = components.find((c: any) => c.componentType === 'subpremise')?.componentName.text || ''

		return {
			suggestedAddress:{
				streetAddress: `${streetNumber} ${route}`,
				subpremise,
				city: postalAddress.locality || '',
				state: postalAddress.administrativeArea || '',
				zipCode: postalAddress.postalCode || '',
			},
			unconfirmedComponentTypes
		}
	} catch (error) {
		console.error('Error extracting address components:', error)
		return null
	}
}