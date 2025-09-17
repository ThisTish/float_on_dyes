import { dyeTypes } from "@/lib/constants/discOptions"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@/components/ui/drawer"
import { List, X } from "lucide-react"

const DyeTypeList = () => {
	return (
		<>
			<section className="hidden flex-wrap justify-center bg-lightGreen p-5 text-center leading-loose dark:bg-card md:flex">
				{dyeTypes.map((type) => (
					<span
						className="px-3"
						key={type.name}
					>
						<a
							href={`#${type.fragment}`}
							className="font-semibold text-darkBlue hover:text-white md:text-xl"
						>
							{type.name}
						</a>
					</span>
				))}
			</section>

			<Drawer>
				<DrawerTrigger
					asChild
					className="w-2/3"
				>
					<button className="mx-auto mt-20 flex justify-center gap-3 bg-lightGreen p-5 text-center text-darkBlue shadow-md dark:bg-card md:hidden">
						List <List className="hover:scale-110" />
					</button>
				</DrawerTrigger>
				<DrawerContent className="flex flex-wrap justify-center bg-lightGreen p-5 text-center dark:bg-card md:hidden">
					<DrawerClose className="ml-auto text-darkBlue hover:text-white">
						<X size={20} />
					</DrawerClose>
					<DrawerHeader className="hidden">
						<DrawerTitle>Dye Types</DrawerTitle>
					</DrawerHeader>
					<DrawerDescription className="my-3 flex flex-wrap justify-center">
						{dyeTypes.map((type) => (
							<span>
								<a
									key={type.name}
									href={`#${type.fragment}`}
									className="px-3 font-semibold text-darkBlue hover:text-white md:text-xl"
								>
									{type.name}
								</a>
							</span>
						))}
					</DrawerDescription>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default DyeTypeList
