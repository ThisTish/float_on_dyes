import { db } from '@/lib/prisma'
import firstData from '@/db/first-data'


const main = async() => {
	await db.product.deleteMany()

	await db.product.createMany({
		data: firstData.products
	})

	console.log('Seeded the database with first data')
}

main()