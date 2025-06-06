import { dyeTypes } from "@/lib/constants/discOptions"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { List, X } from "lucide-react"

const DyeTypeList = () => {
	return (
		<>
			<section className="hidden flex-wrap justify-center bg-lightGreen p-5 text-center leading-loose dark:bg-card md:flex">
				{dyeTypes.map((type) => (
					<span className="px-3">
						<a
							key={type.name}
							href={`#${type.fragment}`}
							className="font-semibold text-darkBlue hover:text-white md:text-xl">
							{type.name}
						</a>
					</span>
				))}
			</section>

			<Drawer >
				<DrawerTrigger className="w-full">
					<button  className="mx-auto mt-20 flex w-2/3 justify-center gap-3 bg-lightGreen p-5 text-center text-darkBlue shadow-md md:hidden">
						List	<List className="hover:scale-110"/>
					</button>
				</DrawerTrigger>
				<DrawerContent className="flex flex-wrap justify-center bg-lightGreen p-5 text-center leading-loose dark:bg-card md:hidden">
					<DrawerClose className="ml-auto text-darkBlue hover:text-white">
						<X size={20} />
					</DrawerClose>
					<DrawerHeader className="hidden">
						<DrawerTitle >
							Dye Types
						</DrawerTitle>
					</DrawerHeader>
					<DrawerDescription>
						<div className="my-3 flex flex-wrap justify-center gap-3">
						{dyeTypes.map((type) => (
								<span>
									<a
										key={type.name}
										href={`#${type.fragment}`}
										className="font-semibold text-darkBlue hover:text-white md:text-xl">
										{type.name}
									</a>
								</span>
						))}
						</div>
					</DrawerDescription>

				</DrawerContent>
			</Drawer>
		</>

	)
}

export default DyeTypeList