import { cn } from "@/lib/utils"

const ProductPrice = ({ value, className }: { value: number, className?: string }) => {
	console.log(typeof(value))
	const stringValue = value.toFixed(2)
	const [int, decimal] = stringValue.split('.')


	return (
		<div className={cn('text-lg font-semibold', className)}>
			<p>
				<span className="text-xs font-medium align-super">$</span>
				{int}.
				<span className="text-xs font-medium align-super">{decimal}</span>
			</p>

		</div>
	)
}

export default ProductPrice