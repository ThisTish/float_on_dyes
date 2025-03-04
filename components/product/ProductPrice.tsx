import { cn } from "@/lib/utils"

const ProductPrice = ({ value, className, size }: { value: number, className?: string, size?: string }) => {
	const stringValue = value.toFixed(2)
	const [int, decimal] = stringValue.split('.')


	return (
		<div className={cn('text-lg font-semibold', className)}>
			<p>
				<span className={`text-xs align-super ${size === 'sm' ? 'font-extralight': 'font-medium'}`}>$</span>
				{int}.
				<span className={`text-xs align-super ${size === 'sm' ? 'font-extralight': 'font-medium'}`}>{decimal}</span>
			</p>

		</div>
	)
}

export default ProductPrice