"use client"

import { Button } from "@/components/ui/button"
import { formUrlQuery } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

const Pagination = ({ page, totalPages, urlParamName }: { page: number | string, totalPages: number, urlParamName?: string }) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleClick = (direction: 'prev' | 'next') => {
		const pageValue = direction === 'next' ? Number(page) + 1 : Number(page) - 1
		const newUrl = formUrlQuery({
			params: searchParams.toString(),
			key: urlParamName || 'page',
			value: pageValue.toString()
		})
		router.push(newUrl)

	}

	return (
		<div className="flex gap-2">
			<Button
				size={'sm'}
				disabled={Number(page) <= 1}
				onClick={() => handleClick('prev')}>
				Previous
			</Button>

			<Button
				size={'sm'}
				disabled={Number(page) >= totalPages}
				onClick={() => handleClick('next')}>
				Next
			</Button>
		</div>
	)
}

export default Pagination