import { ChangeEvent, forwardRef } from "react"

type CheckBoxProps = {
	id: string
	name?: string
	type?: "checkbox" | "radio"
	checked: boolean
	onChange: (e:ChangeEvent<HTMLInputElement>) => void
	disabled?: boolean

}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(({ id, name, type = "checkbox", checked = false, onChange, disabled }, ref) => {
	return (
		<div className={`relative ${disabled ? "pointer-events-none opacity-50" : ''}`}>
			<label htmlFor={id} className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-darkGreen p-1 duration-100 hover:p-2">
				<input 
				type={type} 
				className="group peer hidden"
				id={id} 
				name={name}
				checked={checked}
				onChange={onChange}
				ref={ref}
				disabled={disabled}
				/>
				<label htmlFor={id} className="h-full w-full rounded-full bg-background peer-checked:size-0"></label>
				<div className="absolute left-[10px] h-1 w-4 -translate-y-10 translate-x-10 rotate-[-41deg] rounded-sm bg-primary-foreground duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
				<div className="absolute left-[7px] top-4 h-1 w-2 -translate-x-10 -translate-y-10 rotate-45 rounded-sm bg-primary-foreground duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
			</label>
		</div>
	)
})

export default Checkbox
