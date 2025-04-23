"use client"

import { customOrderSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Decimal } from "@prisma/client/runtime/library"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField } from "../ui/form"
import ComboBox from "../cart/ComboBox"

// todo pass index number of customDyeImages, and the setCurrentImage function to pass it back???

type CustomOrderFormProps = {
	discs: {
		id: string,
		name: string,
		brand: string,
		plastic: string,
		weight: number,
		isStamped: boolean,
		price: Decimal | string,
		images: string[]
	}[]
}


const CustomOrderForm = ({ discs }: CustomOrderFormProps) => {
	// console.log(discs)
	const discOptions = discs.map((disc) => ({
		value: `${disc.name} ${disc.brand}`,
		label:
		(
			<>
				<span className="font-semibold">{disc.name}</span>
				<span className="italic">{disc.brand}</span>
				<span className="font-light">{disc.plastic.toLowerCase()}</span>
				<span className="font-thin">{disc.weight}</span>
				<span className="absolute right-0">{disc.price as String}</span>
			</>
		)
	}))


	const form = useForm<z.infer<typeof customOrderSchema>>({
		resolver: zodResolver(customOrderSchema),
		defaultValues: {
			disc: {},
			dyeType: '',
			colors: [],
			notes: '',
			rimSpin: false,
			rimDip: false,
			fullBackDip: false,
			glueMask: false,
			wipeStamp: false
		}
	})

	const onSubmit = async (values: z.infer<typeof customOrderSchema>) => {
		console.log('submit custom order', values)
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}>

					{/* disc */}
					<FormField
						control={form.control}
						name='disc'
						render={({ field }) => (
							<ComboBox
								field={field}
								label="Disc"
								list={discOptions}
								placeholder="Choose your disc..."
							/>

						)}
					/>

					{/* dyeDesign */}
					{/* colors */}
					{/* extra options */}
					{/* notes */}
					{/* submit or clear buttons */}


				</form>
			</Form>
		</>
	)
}

export default CustomOrderForm