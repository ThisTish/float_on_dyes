import { LATEST_PRODUCTS_LIMIT } from "../constants"
import { db } from "../prisma"

export const getLatestProducts = async () =>{
	const data = await db.product.findMany({
		take: LATEST_PRODUCTS_LIMIT,
		orderBy: {
			createdAt: 'desc'
		}
	})
	return data
}