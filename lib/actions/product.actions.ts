import { LATEST_PRODUCTS_LIMIT } from "../constants"
import { db } from "../prisma"

export const getLatestProducts = async () =>{
try {
		const data = await db.product.findMany({
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

export const getProductBySlug = async (slug: string) =>{
	try {
		return await db.product.findFirst({
			where: {
				slug
			}
		})

	} catch (error) {
		console.error(error)
		throw new Error("Product couldn't be found")
		
	}
}