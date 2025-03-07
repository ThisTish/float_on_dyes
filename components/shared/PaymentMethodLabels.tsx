import payments from "@/lib/constants/payments"
import { FaPaypal } from "react-icons/fa"

const PaymentMethodLabels = ({ method }: { method: string }) => {

	return (
		<>
			{method === 'Credit Card'
				? (
					<>
						<span>{method}</span>
						<div className="flex space-x-1">

						{payments.slice(0, 4).map((card) => (
							<card.icon className="text-darkBlue" size={25} />
						))}
						</div>
					</>
				) : method === 'PayPal'
					? (
						<>
							<span>{method}</span>
							<FaPaypal size={25} className="text-darkBlue" />
						</>
					) : (
						<>
							<span>{method}</span>
							<span className="text-darkBlue text-xs text-balance text-end w-1/3">*Only available in the Salt Lake Valley, UT</span>
						</>
					)}
		</>
	)
}

export default PaymentMethodLabels