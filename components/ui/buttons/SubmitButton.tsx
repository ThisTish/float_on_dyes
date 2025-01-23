import { Send } from 'lucide-react';
import React from 'react';

const SubmitButton = () => {
	return (
		<button className="flex items-center justify-center size-10 cursor-pointer relative overflow-hidden transition-all duration-600 bg-lightCta group hover:w-28 hover:transition-all hover:duration-300 active:transform active:translate-x-1 active:translate-y-1 group text-white">
			<div className="w-full flex items-center justify-center group-hover:pl-2 group-hover:transition-all group-hover:duration-600"><Send /></div>
			<div className="hidden group-hover:block group-hover:transition-all group-hover:duration-600 group-hover:pr-6 group-hover:translate-x-2 pr-2">Submit</div>
		</button>
	);
}

export default SubmitButton;
