type CheckBoxProps = {
	label: string
}

const Checkbox = ({ label }: CheckBoxProps) => {
	return (
		<div className="relative">
			<label htmlFor={label} className="relative flex size-14 items-center justify-center overflow-hidden rounded-full bg-darkGreen p-1 duration-100 hover:p-2">
				<input type="checkbox" className="group peer hidden" id={label} />
				<label htmlFor={label} className="w-full h-full rounded-full bg-primary-foreground peer-checked:size-0"></label>
				<div className="absolute left-[1.3rem] h-[4px] w-[25px] -translate-y-10  translate-x-10 rotate-[-41deg] rounded-sm bg-primary-foreground duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
				<div className="absolute left-3 top-7 h-[4px] w-[15px] -translate-x-10 -translate-y-10  rotate-45 rounded-sm bg-primary-foreground duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
			</label>
		</div>
	)
}

export default Checkbox