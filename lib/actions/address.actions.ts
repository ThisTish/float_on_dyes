"use server"


import { prisma } from "@/db/prisma"
import { formatError } from "../utils"
import { shippingAddressSchema } from "../validators"
import { getUserById } from "./users.actions"
import { ShippingAddress } from "@/types"
import { auth } from "@/auth"

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
			}
		}

		const data = await response.json()

		const unconfirmedComponentTypes = data.result?.address?.unconfirmedComponentTypes || []
		const missingComponentTypes = data.result?.address?.missingComponentTypes || []

		if (unconfirmedComponentTypes.length > 0 || missingComponentTypes.length > 0) {
			return {
				success: true,
				message: 'Missing or unconfirmed information. Please check the address and try again.',
				missingComponentTypes,
				unconfirmedComponentTypes,
				onlyUnconfirmed: unconfirmedComponentTypes.length > 0 && missingComponentTypes.length === 0,
			}
		}

		const componentData = data.result?.address?.formattedAddress
			? extractAddressComponents(data.result)
			: null

		const needsConfirming = data.result?.verdict?.hasInferredComponents || data.result?.verdict?.hasReplacedComponents
		if (needsConfirming) {
			console.log('Address validation response:', data.result)
			console.dir(data.result.address.addressComponents)
			return {
				success: true,
				message: 'Please select your address as is, or the updated suggested address.',
				originalAddress: address,
				componentData,
				inputAddressFormatted: data.result?.uspsData?.standardizedAddress.firstAddressLine || '',
				correctedAddressFormatted: data.result?.address?.formattedAddress || '',
				location: data.result.geocode.location

			}
		}

		updateUserAddress(address)
		console.log('address completely correct', data.result?.address?.formattedAddress)
		return {
			success: true,
			message: 'Address saved successfully',
		}


	} catch (error) {
		return {
			success: false,
			message: formatError(error),
		}
	}
}

function extractAddressComponents(result: any) {
	try {
		const components = result.address?.addressComponents || []
		const postalAddress = result.address?.postalAddress || {}

		const streetNumber = components.find((c: any) => c.componentType === 'street_number')?.componentName.text || ''
		const route = components.find((c: any) => c.componentType === 'route')?.componentName.text || ''
		const subpremise = components.find((c: any) => c.componentType === 'subpremise')?.componentName.text || ''

		return {
			suggestedAddress: {
				streetAddress: `${streetNumber} ${route}`,
				subpremise,
				city: postalAddress.locality || '',
				state: postalAddress.administrativeArea || '',
				zipCode: postalAddress.postalCode || '',
			},
			components
		}
	} catch (error) {
		console.error('Error extracting address components:', error)
		return null
	}
}