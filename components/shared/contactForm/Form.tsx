"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Send } from "lucide-react"
import Checkbox from "@/components/ui/Checkbox"

const contactFormSchema = z.object({
	name: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email(),
	message: z.string().min(25, {
		message: "Message must be at least 25 characters.",
	})
})

export function ContactForm() {
	// ...

	const form = useForm({
		resolver: zodResolver(contactFormSchema),
	})

	

	return (
		<Form {...form}>
			<form onSubmit={() => console.log('submitted')} className="space-y-5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
				
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						
							<FormMessage />
						</FormItem>
					)}
				/>
				
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea {...field} />
								{/* https://shadcnui-expansions.typeart.cc/docs/autosize-textarea */}
							</FormControl>
						
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button variant={'icon'} type="submit">
					<AnimatedDiv animation={"rotate"} >
						<Send size={24}/>
					</AnimatedDiv>
					<AnimatedDiv variant={'icon'} size={'icon'} animation={'show'}>
					<span className="ml-2"> 
						Submit
					</span>
					</AnimatedDiv>
					</Button>
			</form>
		</Form>
	)
}

export default ContactForm
