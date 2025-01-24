import { Send } from 'lucide-react';
import React from 'react';

const SubmitButton = () => {
	return (
		//   <span className="group text-white size-10 transition-all duration-600 bg-lightCta group hover:w-28 hover:transition-all hover:duration-300 active:transform active:translate-x-1 active:translate-y-1">


		<button type='submit' className="group flex items-center justify-center gap-2 shadow-xl  text-lg relative overflow-hidden p-2 z-10
		text-white bg-lightCta 
		hover:transition-all hover:duration-300 active:transform active:translate-x-1 active:translate-y-1 lg:font-semibold">
			<div className="w-full flex items-center justify-center group-hover:pl-2 group-hover:transition-all group-hover:duration-600 group-hover:rotate-45"><Send /></div>
			<div className="hidden group-hover:block group-hover:transition-all group-hover:duration-600 group-hover:pr-6 group-hover:translate-x-2 pr-2">Submit</div>
		</button>
	);
}

export default SubmitButton;
