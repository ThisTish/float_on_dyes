"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { convertToPlainObject, formatError } from "../utils"
import { auth } from "@/auth"
import { getCart } from "./cart.actions"
import { getUserById } from "./users.actions"
import { insertOrderSchema } from "../validators"
import { prisma } from "@/db/prisma"
import { CartItem } from "@/types"

export async function createOrder(){
	try {
		const session = await auth()
		if(!session) throw new Error("Unauthorized")
		
			const userId = session.user.id
		if(!userId) throw new Error("User not found")
		
			const user = await getUserById(userId)
		if(!user) throw new Error("User not found")
		
		const cart = await getCart()
		if(!cart || cart.items.length === 0) return { success: false, message: 'Cart is empty', redirectTo: '/cart'}
		
		if(!user.address) return { success: false, message: 'Cart is empty', redirectTo: '/shipping-address'}
		if(!user.paymentMethod) return { success: false, message: 'Cart is empty', redirectTo: '/payment-method'}

		const order = insertOrderSchema.parse({
			userId,
			shippingAddress: user.address,
			paymentMethod: user.paymentMethod,
			itemsPrice: cart.itemsPrice,
			taxPrice: cart.taxPrice,
			shippingPrice: cart.shippingPrice,
			totalPrice: cart.totalPrice,
		})

		const createdOrderId = await prisma.$transaction(async(tx) =>{
			const createdOrder = await tx.order.create({
				data: order
			})

			for(const item of cart.items as CartItem[]){
				await tx.orderItem.create({
					data: {
						...item,
						price: item.price,
						orderId: createdOrder.id
					}
				})
			}

			await tx.cart.update({
				where: {
					id: cart.id
				},
				data: {
					items: [],
					itemsPrice: 0,
					taxPrice: 0,
					shippingPrice: 0,
					totalPrice: 0,
				}
			})

			return createdOrder.id

		})

		if(!createdOrderId) throw new Error("Order failed")

		return { success: true, message: 'Order created', redirectTo: `/order/${createdOrderId}`}

	} catch (error) {
	if(isRedirectError(error)) throw error		
	return { success: false, error: formatError(error)}
	}
}

export async function getOrderById(orderId: string){
	try {
		const data = await prisma.order.findFirst({
			where: {
				id: orderId
			},
			include: {
				orderItems: true,
				user: { 
					select: {
						name: true,
						email: true
					}
				}
			}
		})
		
		if(!data) throw new Error("Order not found")
		return convertToPlainObject(data)

	} catch (error) {
		throw new Error(formatError(error))		
	}
}