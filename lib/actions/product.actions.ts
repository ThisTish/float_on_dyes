"use server"

import { prisma } from "@/db/prisma"
import { LATEST_PRODUCTS_LIMIT } from "../constants"
import { convertToPlainObject } from "../utils"


// get Latest Products
// todo change to featured products
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

// get all products
export const getAllProducts = async() => {
	try {
		const data = await prisma.product.findMany({
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
		const product = await prisma.product.findFirst({
			where: {
				slug
			}
		})
		return convertToPlainObject(product)
	} catch (error) {
		console.error(error)
		throw new Error("Disc couldn't be found")
	}
}

// get dyeable discs
export const getDyeableDiscs = async () => {
	try {
		const data = await prisma.product.findMany({
			where: {
				OR: [
					{ dyeType: { equals: "none" } },
					{ dyeType: { equals: "special" } },
					{dyeType: { equals: "blank" }}

				],
				isAvailable: true,
				stock: {
					gte: 1
				}
			},
			select: {
				id: true,
				name: true,
				brand: true,
				plastic: true,
				weight: true,
				isStamped: true,
				price: true,
				images: true,
				slug: true
			}
		})

		return convertToPlainObject(data)
	} catch (error) {
		console.error(error)
		throw new Error("Dyeable discs couldn't be found")
	}
}

// get dyed discs for dye type gallery
export const getDyedDiscs = async () => {
	try {
		const data = await prisma.product.findMany({
			where: {
				OR: [
					{dyeType: { not: "none" }},
					{dyeType: { not: "special" }},
					{dyeType: { not: "blank" }}
				]
			},
			select: {
				id: true,
				name: true,
				images: true,
				dyeType: true,
				slug: true,
				stock: true,
				isAvailable: true
			}
		})

		return convertToPlainObject(data)
	}catch(error){
		console.error(error)
		throw new Error("Dyed discs couldn't be found")
	}
}

// get products by keyword
// export const getProductByKeyword = async (search: string) => {
// 	try {
// 		const product = await prisma.product.findFirst({
// 			where: {
// 				OR:[
// 					{name: search},
// 					{brand: search},
// 					{dyeType: search},
// 					{discType: search}
// 				]
// 			}
// 		})
// 		return convertToPlainObject(product)
// 	} catch (error) {
// 		console.error(error)
// 		throw new Error("Disc couldn't be found")
// 	}
// }
