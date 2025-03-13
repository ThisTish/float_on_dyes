"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useState, useTransition } from "react"
import { PiSpinnerBallDuotone } from "react-icons/pi"

const DeleteDialog = ({ id, action }: { id: string, action: (id: string) => Promise<{ success: boolean, message: string }> }) => {
	const [open, setOpen] = useState(false)
	const [pending, startTransition] = useTransition()
	const { toast } = useToast()

	const handleDeleteClick = () => {
		startTransition(async () => {
			const res = await action(id)

			if (!res.success) {
				toast({
					title: 'Error',
					description: res.message,
					variant: 'destructive'
				})
			}
			if (res.success) {
				setOpen(false)
				toast({
					title: 'Success',
					description: res.message,
				})
			}
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size='chip' variant={'destructive'}>
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this order?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action is irreversible
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						Cancel
					</AlertDialogCancel>
					<Button variant={'destructive'} disabled={pending} onClick={handleDeleteClick} className="h-10">
						{pending ? (
							<>
								<span>Deleting</span>
								<PiSpinnerBallDuotone className="animate-spin mx-auto" />
							</>
						) :
							<span>Delete</span>
						}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteDialog