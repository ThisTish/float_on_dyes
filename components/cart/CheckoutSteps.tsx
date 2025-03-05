import { cn } from "@/lib/utils"
import React from "react"

const CheckoutSteps = ({ current = 0 }) => {
	return (
		<div className="flex-between flex-col gap-2 mb-10 md:flex-row">
			{['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map((step, index) => (
				<React.Fragment key={step}>
					<div className={`p-2 w-56 text-center text-sm ${index === current ? 'bg-secondary font-bold text-darkGreen border border-darkGreen' : ''}`}>
						{step}
					</div>
					{step !== 'Place Order' ? 
						<hr className="w-16 border-t mx-2 border-lightGreen" />
						: null
					}
				</React.Fragment>
			))}
		</div>
	)
}

export default CheckoutSteps