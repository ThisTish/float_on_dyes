import firstData from '@/db/first-data'
import { prisma } from './prisma'


const main = async() => {
	await prisma.product.deleteMany()
	await prisma.account.deleteMany()
	await prisma.session.deleteMany()
	await prisma.verificationToken.deleteMany()
	await prisma.user.deleteMany()
	console.log('deleted the database')

	await prisma.product.createMany({
		data: firstData.products
	})
	await prisma.user.createMany({
		data: firstData.users
	})

	console.log('Seeded the database with first data')
}

main()