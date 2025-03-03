// import "@/app/globals.css"
// import { auth } from "@/auth"
// import CheckoutSteps from "@/components/cart/CheckoutSteps"
// import { getCart } from "@/lib/actions/cart.actions"
// import { getUserById } from "@/lib/actions/users.actions"
// import { redirect } from "next/navigation"

// // todo left off with trying to figure out how to pass user to children.

// export default async function RootLayout({
// 	children,
// }: Readonly<{
// 	children: React.ReactNode
// }>) {

// 	const cart = await getCart()
// 	if (!cart || cart.items.length === 0) redirect('/cart')

// 	const session = await auth()
// 	const userId = session?.user.id
// 	if (!userId) throw new Error('No user id')

// 	const user = await getUserById(userId)

// 	const { pathname } = window.location

// 	let currentStep = 1
// 	switch (pathname) {

// 		case '/checkout/payment-method':
// 			currentStep = 2
// 			break
// 		case '/checkout/review':
// 			currentStep = 3
// 			break
// 		default:
// 			currentStep = 1
// 	}

// 	return (
// 		<div className="mt-40">
// 			<CheckoutSteps current={currentStep} />
// 			{children}
// 		</div>
// 	)
// }
