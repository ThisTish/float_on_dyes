import { db } from '@/lib/prisma'
import firstData from '@/db/first-data'


const main = async() => {
	await db.product.deleteMany()
	await db.account.deleteMany()
	await db.session.deleteMany()
	await db.verificationToken.deleteMany()
	await db.user.deleteMany()
	console.log('deleted the database')

	await db.product.createMany({
		data: firstData.products
	})
	await db.user.createMany({
		data: firstData.users
	})

	console.log('Seeded the database with first data')
}

main()