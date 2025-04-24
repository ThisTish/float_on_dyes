import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ShippingAddress } from "@/types"
import { Button } from "../ui/button"
import { X } from "lucide-react"

type validateShippingAddressDialogProps = {
	values: ShippingAddress,
	suggestedAddress: ShippingAddress,
	isOpen: boolean,
	saveAndCloseAction: () => void,
	updateAndCloseAction: () => void,
	closeAction: () => void
}


const ValidateAddressDialog = ({ values, suggestedAddress, isOpen, saveAndCloseAction, updateAndCloseAction, closeAction }: validateShippingAddressDialogProps) => {
	return (
		<Dialog open={isOpen} >
			<DialogContent>
				<DialogClose onClick={closeAction} className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"><X className="size-4" /><span className="sr-only">Close</span></DialogClose>

				<DialogHeader>
					<DialogTitle className="text-center">Select the address you'd like to use</DialogTitle>
				</DialogHeader>
				<div className="grid gap-3 sm:grid-cols-2">

					<Card >
						<CardHeader>
							<CardTitle className="text-center">Your Entry</CardTitle>
						</CardHeader>
						<CardContent>
							<address className="mx-auto w-fit">
								<p>{values.streetAddress}</p>
								{values.subpremise ? (
									<p>{values.subpremise}</p>
								) : null}
								<p>{values.city}, {values.state} </p>
								<p>{values.zipCode}</p>
								<p>{values.country}</p>
							</address>
						</CardContent>
						<CardFooter className="my-3">
							<DialogClose asChild>
								<Button variant={'outline'} onClick={saveAndCloseAction} className="mx-auto">
									Use address entered
								</Button>
							</DialogClose>
						</CardFooter>
					</Card>

					<Card >
						<CardHeader>
							<CardTitle className="text-center">Suggested Entry</CardTitle>
						</CardHeader>
						<CardContent>
							<address className="mx-auto w-fit text-pretty">
								<p>{suggestedAddress.streetAddress}</p>
								{suggestedAddress.subpremise ? (
									<p>{suggestedAddress.subpremise}</p>
								) : null}
								<p>{suggestedAddress.city}, {suggestedAddress.state}</p>
								<p> {suggestedAddress.zipCode}</p>
								<p>{suggestedAddress.country}</p>
							</address>
						</CardContent>
						<CardFooter className="my-3">
							<DialogClose asChild>
								<Button onClick={updateAndCloseAction} className="mx-auto">
									Use suggested address
								</Button>
							</DialogClose>
						</CardFooter>
					</Card>
				</div>
				<DialogClose asChild>
					<Button variant={'destructive'} onClick={closeAction} className="mx-auto mt-4">Go Back</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>

	)
}

export default ValidateAddressDialog