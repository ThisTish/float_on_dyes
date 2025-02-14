import { prisma } from "@/db/prisma"
import { LATEST_PRODUCTS_LIMIT } from "../constants"


// get Latest Products
export const getLatestProducts = async () => {
	try {
		const data = await prisma.product.findMany({
			take: LATEST_PRODUCTS_LIMIT,
			orderBy: {
				createdAt: 'desc'
			}
		})
		return data
	} catch (error) {
		console.error(error)
		throw new Error("Products couldn't be found")
	}
}

// get Product By Slug
export const getProductBySlug = async (slug: string) => {
	try {
		return await prisma.product.findFirst({
			where: {
				slug
			}
		})
	} catch (error) {
		console.error(error)
		throw new Error("Product couldn't be found")
	}
}