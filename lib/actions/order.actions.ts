"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { convertToPlainObject, formatError } from "../utils"
import { auth } from "@/auth"
import { getCart } from "./cart.actions"
import { getUserById } from "./users.actions"
import { insertOrderSchema } from "../validators"
import { prisma } from "@/db/prisma"
import { CartItem, SalesDataType } from "@/types"
import { ITEMS_ON_PAGE } from "../constants"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function createOrder() {
	try {
		const session = await auth()
		if (!session) throw new Error("Unauthorized")

		const userId = session.user.id
		if (!userId) throw new Error("User not found")

		const user = await getUserById(userId)
		if (!user) throw new Error("User not found")

		const cart = await getCart()
		if (!cart || cart.items.length === 0) return { success: false, message: 'Cart is empty', redirectTo: '/cart' }

		if (!user.address) return { success: false, message: 'Cart is empty', redirectTo: '/shipping-address' }
		if (!user.paymentMethod) return { success: false, message: 'Cart is empty', redirectTo: '/payment-method' }

		const order = insertOrderSchema.parse({
			userId,
			shippingAddress: user.address,
			paymentMethod: user.paymentMethod,
			itemsPrice: cart.itemsPrice,
			taxPrice: cart.taxPrice,
			shippingPrice: cart.shippingPrice,
			totalPrice: cart.totalPrice,
		})

		const createdOrderId = await prisma.$transaction(async (tx) => {
			const createdOrder = await tx.order.create({
				data: order
			})

			for (const item of cart.items as CartItem[]) {
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

		if (!createdOrderId) throw new Error("Order failed")

		return { success: true, message: 'Order created', redirectTo: `/order/${createdOrderId}` }

	} catch (error) {
		if (isRedirectError(error)) throw error
		return { success: false, error: formatError(error) }
	}
}

export async function getOrderById(orderId: string) {
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

		if (!data) throw new Error("Order not found")
		return convertToPlainObject(data)

	} catch (error) {
		throw new Error(formatError(error))
	}
}

export async function getUserOrders({ limit = ITEMS_ON_PAGE, page }: { limit?: number, page: number }) {
	const session = await auth()
	if (!session) throw new Error("User is not authorized")

	const data = await prisma.order.findMany({
		where: {
			userId: session.user.id
		},
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			id: true,
			createdAt: true,
			isPaid: true,
			paidAt: true,
			isDelivered: true,
			deliveredAt: true,
			totalPrice: true,
			user: {
				select: {
					name: true
				}
			}
		},
		take: limit,
		skip: (page - 1) * limit,
	})

	const dataCount = await prisma.order.count({
		where: {
			userId: session.user.id
		}
	})

	return {
		data,
		totalPages: Math.ceil(dataCount / limit)
	}
}



// get sales data
export async function getOrderSummary() {
	const ordersCount = await prisma.order.count()
	const productsCount = await prisma.product.count()
	const usersCount = await prisma.user.count()

	const totalSales = await prisma.order.aggregate({
		_sum: {
			totalPrice: true
		}
	})

	// Prisma does not support date formatting functions like to_char directly in its query builder.
	const salesDataRaw = await prisma.$queryRaw<Array<{ month: string, totalSales: Prisma.Decimal }>>
		`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`

	const salesData: SalesDataType = salesDataRaw.map((entry) => ({
		month: entry.month,
		totalSales: Number(entry.totalSales)
	}))

	const latestOrders = await prisma.order.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			user: {
				select: {
					name: true
				}
			}
		},
		take: 6
	})


	return {
		ordersCount,
		productsCount,
		usersCount,
		totalSales,
		salesData,
		latestOrders
	}
}

export async function getAllOrders({ limit = ITEMS_ON_PAGE, page, }: { limit?: number, page: number }) {
	const data = await prisma.order.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		take: limit,
		skip: (page - 1) * limit,
		select: {
			id: true,
			createdAt: true,
			isPaid: true,
			paidAt: true,
			isDelivered: true,
			deliveredAt: true,
			totalPrice: true,
			user: {
				select: {
					name: true
				}
			}
		}
	})

	const dataCount = await prisma.order.count()

	return {
		data,
		totalPages: Math.ceil(dataCount / limit)
	}
}

export async function deleteOrder(id: string) {
	try {
		await prisma.order.delete({
			where: {
				id
			}
		})
		revalidatePath('/admin/orders')
		return { success: true, message: 'Order deleted' }

	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}