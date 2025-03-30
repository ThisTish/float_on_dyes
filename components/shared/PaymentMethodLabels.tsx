import payments from "@/lib/constants/payments"
import { FaPaypal } from "react-icons/fa"

const PaymentMethodLabels = ({ method }: { method: string }) => {

	return (
		<>
			{method === 'Credit Card'
				? (
					<>
						<span>{method}</span>
						<span className="flex space-x-1">

						{payments.slice(0, 4).map((card) => (
							<card.icon key={card.name} className="text-darkBlue" size={25} />
						))}
						</span>
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
							<span className="w-1/3 text-balance text-end text-xs text-darkBlue">*Only available in the Salt Lake Valley, UT</span>
						</>
					)}
		</>
	)
}

export default PaymentMethodLabels