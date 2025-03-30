import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ReactNode } from "react"

const SummaryCard = ({title, icon, value}: {title: string, icon:ReactNode, value:number | string}) => {
	return (
		<Card className="p-3">
			<CardHeader>
				<CardTitle className="flex justify-between font-bold">
					{title}
					{icon}
				</CardTitle>
				<CardContent className="mx-5 text-lg">
						{value}
				</CardContent>
			</CardHeader>
		</Card>

	)
}

export default SummaryCard