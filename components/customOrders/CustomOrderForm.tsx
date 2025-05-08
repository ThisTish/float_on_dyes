"use client"

import { customOrderSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Decimal } from "@prisma/client/runtime/library"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form"
import ComboBox from "../cart/ComboBox"
import { formatCurrency, formatNumber, formatNumberWithDecimal } from "@/lib/utils"
import { dyeTypes, RIMOPTIONS, STAMPOPTIONS } from "@/lib/constants/discOptions"
import { MultiSelect } from "../ui/multi-select"
import Checkbox from "../ui/Checkbox"
import { useRef, useTransition } from "react"
import { RadioGroup } from "@radix-ui/react-dropdown-menu"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight, Send, X } from "lucide-react"

// todo multiselect over 3 doesn't show, need to figure out way to charge for extra colors
//* todo multiselect does no clear on form.reset()

//> todo pass index number of customDyeImages, and the setCurrentImage function to pass it back???


type CustomOrderFormProps = {
	discs: {
		id: string,
		name: string,
		brand: string,
		plastic: string,
		weight: number,
		isStamped: boolean,
		price: Decimal | string,
		images: string[],
		slug: string
	}[]
}


const CustomOrderForm = ({ discs }: CustomOrderFormProps) => {
	const rimOptionRef = useRef<HTMLInputElement>(null)
	const stampOptionRef = useRef<HTMLInputElement>(null)
	const [pending, startTransition] = useTransition()


	const discOptions = discs.map((disc) => ({
		value: disc.slug,
		label:
			(
				<div className="flex w-full items-center gap-3 overflow-x-auto text-black">
					<img src={`${disc.images[0]}`} alt={disc.name} className="size-14 rounded-full object-cover hover:size-32" />
					<div className="flex w-full flex-wrap gap-1 text-pretty p-1 text-sm sm:gap-3 md:text-base">
						<span className="font-semibold">{disc.name}</span>
						<span className="italic">{disc.brand}</span>
						<span className="font-light">{disc.plastic.toLowerCase()}</span>
						<span className="font-thin">{disc.weight} oz</span>
						<span className="ml-auto pr-3 italic">{Number(disc.price) > 35.99 ? `+ ${formatCurrency(Number(disc.price) - 35.99)}` : ''}</span>

					</div>
				</div>
			)
	}))

	const dyeOptions = dyeTypes.map((type) => ({
		value: `${type.name}`,
		label:
			(
				<div className="flex w-full items-center gap-3 overflow-x-auto text-black">
					<img src={`${type.images[0]}`} alt={type.name} className="size-14 rounded-full object-cover" />
					<div className="flex w-full flex-wrap gap-1 text-pretty p-1 text-sm sm:gap-3 md:text-base">
						<span className="font-semibold">{type.name}</span>
						{type.extra ? (
							<span className="ml-auto pr-3 italic">+ ${type.extra}</span>
						) : null}
					</div>
				</div>
			)
	}))

	const colorOptions = [
		{ value: 'black', label: 'Black' },
		{ value: 'purple', label: 'Purple' },
		{ value: 'blue', label: 'Blue' },
		{ value: 'green', label: 'Green' },
		{ value: 'yellow', label: 'Yellow' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'red', label: 'Red' },
		{ value: 'pink', label: 'Pink' },
		{ value: 'rainbow', label: 'Rainbow' }
	]


	const form = useForm<z.infer<typeof customOrderSchema>>({
		resolver: zodResolver(customOrderSchema),
		defaultValues: {
			disc: '',
			dyeType: '',
			colors: [],
			notes: '',
			rimOptions: undefined,
			stampOptions: undefined
		}
	})

	const onSubmit = async (values: z.infer<typeof customOrderSchema>) => {
		// todo find disc, make sure it is in stock, add to cart, basically, but add notes somehow-probably update addtocart schema.
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
								placeholder="Choose from available discs"
							/>
						)}
					/>

					{/* dyeType */}
					<FormField
						control={form.control}
						name='dyeType'
						render={({ field }) => (
							<ComboBox
								field={field}
								label="Dye Type"
								list={dyeOptions}
								placeholder="Select a dye type"
							/>
						)}
					/>

					{/* colors */}
					<FormField
						control={form.control}
						name="colors"
						render={({ field }) => (
							<MultiSelect
								field={field}
								label='Colors'
								onValueChange={field.onChange}
								placeholder="Select colors"
								options={colorOptions}
								variant={'inverted'}
							/>
						)}
					/>

					<div className="grid grid-cols-2 gap-3">
						{/* rim Options */}
						<fieldset className="space-y-3 border-[1px] p-3">
							<legend className="px-1 text-sm font-extralight md:text-base">Extra Rim Options</legend>
							{/* rimSpin */}
							<FormField
								control={form.control}
								name='rimOptions'
								render={({ field }) => (
									<RadioGroup
										onValueChange={field.onChange}
										className="flex flex-col space-y-2"
										value={field.value}
									>
										{RIMOPTIONS.map((option) => (
											<FormItem key={option} className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														id={option}
														name='rimOptions'
														checked={field.value === option}
														onChange={() => field.onChange(option)}
														ref={rimOptionRef}
														type="radio"
													/>
												</FormControl>
												<FormLabel htmlFor="rimOptions" className="flex w-full items-center justify-between">
													{option}
												</FormLabel>
											</FormItem>
										))}
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													id="noRim"
													name="rimOptions"
													checked={field.value === undefined}
													onChange={() => field.onChange(undefined)}
													ref={rimOptionRef}
													type="radio"
												/>
											</FormControl>
											<FormLabel htmlFor="rimOptions" className="flex w-full items-center justify-between">
												None
											</FormLabel>
										</FormItem>
									</RadioGroup>
								)}
							/>
						</fieldset>

						{/* stamps options */}
						<fieldset className="space-y-3 border-[1px] p-3">
							<legend className="px-1 text-sm font-extralight md:text-base">Stamped Discs Options</legend>
							<FormField
								control={form.control}
								name='stampOptions'
								render={({ field }) => (
									<RadioGroup
										onValueChange={field.onChange}
										className="flex flex-col space-y-2"
										value={field.value}
									>
										{STAMPOPTIONS.map((option) => (
											<FormItem key={option} className="flex items-center space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														id={option}
														name='stampOptions'
														checked={field.value === option}
														onChange={() => field.onChange(option)}
														ref={stampOptionRef}
														type="radio"
													/>
												</FormControl>
												<FormLabel htmlFor="stampOptions" className="flex w-full items-center justify-between">
													{option}
												</FormLabel>
											</FormItem>
										))}
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													id="noStampOption"
													name="stampOptions"
													checked={field.value === undefined}
													onChange={() => field.onChange(undefined)}
													ref={stampOptionRef}
													type="radio"
												/>
											</FormControl>
											<FormLabel htmlFor="stampOptions" className="flex w-full items-center justify-between">
												None
											</FormLabel>
										</FormItem>
									</RadioGroup>
								)}
							/>
						</fieldset>
					</div>

					{/* notes */}
					<FormField

						name="notes"
						control={form.control}
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormLabel htmlFor="notes" className="flex w-full items-center justify-between">
									Notes
								</FormLabel>
								<FormDescription>
								</FormDescription>
								<FormControl>
									<Textarea 
									placeholder="Include any additional details and we will try our best to accommodate your request." 
									id="notes" 
									value={field.value}
									onChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					{/* buttons */}
					<div className="text-end">
						<Button variant={'destructive'} type='reset' onClick={() => form.reset()}>
							Clear
							<AnimatedDiv variant={'destructive'} animation={'rotateFull'}><X /></AnimatedDiv>
						</Button>
						<Button variant={'default'} disabled={pending}>
							{pending ? (
								<>
									<span className="animate-pulse">Saving</span>
									<PiSpinnerBallDuotone className="animate-spin" />
								</>
							) : (
								<>
									<span>Submit</span>
									<AnimatedDiv animation={'rotate'}>
										<Send />
									</AnimatedDiv>
								</>
							)
							}
						</Button>
					</div>
					
				</form>
			</Form>
		</>
	)

}

export default CustomOrderForm