import { BiLogoVenmo } from "react-icons/bi"
import { FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcVisa, FaPaypal } from "react-icons/fa"


const payments = [
	{
		name: 'Visa',
		icon: FaCcVisa
	},
	{
		name: 'MasterCard',
		icon: FaCcMastercard
	},
	{
		name: 'AmericanExpress',
		icon: FaCcAmex
	},
	{
		name: 'Discover',
		icon: FaCcDiscover
	},
	{
		name: 'Venmo',
		icon: BiLogoVenmo
	},
	{
		name: 'Paypal',
		icon: FaPaypal 
	}

]

export default payments