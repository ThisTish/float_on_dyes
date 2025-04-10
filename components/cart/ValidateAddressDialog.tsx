import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ShippingAddress } from "@/types"

type validateShippingAddressDialogProps = {
	values: ShippingAddress,
	suggestedAddress: ShippingAddress,
	isOpen: boolean,
	saveAndCloseAction: () => void,
	updateAndCloseAction: () => void,
	changedFields?: string[]
}


const ValidateAddressDialog = ({ values, suggestedAddress, isOpen, saveAndCloseAction, updateAndCloseAction, changedFields }: validateShippingAddressDialogProps) => {
	return (
		<Dialog open={isOpen} >
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Use address as is, or suggested?</DialogTitle>
					<DialogContent>

						<Card>
							<CardHeader>
								<CardTitle>Your entry</CardTitle>
							</CardHeader>
							<CardContent>
								<address>
									<p>{values.streetAddress}</p>
									{values.subpremise ? (
										<p>{values.subpremise}</p>
									) : null}
									<p>{values.city}, {values.state} {values.zipCode}</p>
								</address>
							</CardContent>
							<CardFooter>
								<DialogClose>
									<button onClick={saveAndCloseAction} className="btn btn-primary">
										Use this address
									</button>
								</DialogClose>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Suggested entry</CardTitle>
							</CardHeader>
							<CardContent>
								<address>
									<p>{suggestedAddress.streetAddress}</p>
									{suggestedAddress.subpremise ? (
										<p>{suggestedAddress.subpremise}</p>
									) : null}
									<p>{suggestedAddress.city}, {suggestedAddress.state} {suggestedAddress.zipCode}</p>
								</address>
							</CardContent>
							<CardFooter>
								<DialogClose>
									<button onClick={updateAndCloseAction} className="btn btn-primary">
										Use suggested address
									</button>
								</DialogClose>
							</CardFooter>
						</Card>
					</DialogContent>
				</DialogHeader>
			</DialogContent>
		</Dialog>

	)
}

export default ValidateAddressDialog