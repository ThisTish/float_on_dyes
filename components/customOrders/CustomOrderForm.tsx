"use client"

import { cartItemSchema, customOrderSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Decimal } from "@prisma/client/runtime/library"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField } from "../ui/form"
import ComboBox from "../cart/ComboBox"
import { dyeTypes } from "@/lib/constants/dyeTypes"
import SelectInput from "../ui/SelectInput"

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

const CustomOrderForm = ({discs}: CustomOrderFormProps) => {

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

	const onSubmit = async (values: z.infer<typeof customOrderSchema>) =>{
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
						render={({ field}) => (
							// todo needs to be reusable component for this, dyeType, and colors(multi-select w/3 limit)???
							// <SelectInput field={...field}/>
<></>
							// <ComboBox field={field} label="Disc" list={dyeTypes} placeholder="Choose your disc" />
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