import { count } from "console"

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Float On Dyes'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Dyed discs fly better!'
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 6
export const FREE_SHIPPING_PRICE = Number(process.env.FREE_SHIPPING_PRICE) || 100
export const SHIPPING_PRICE = Number(process.env.SHIPPING_PRICE) || 10
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(', ') : ['Credit Card', 'PayPal', 'Cash on Delivery']
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'Credit Card'
export const ITEMS_ON_PAGE = Number(process.env.ITEMS_ON_PAGE) || 12

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const SIGN_IN_DEFAULT_VALUES = {
	email: '',
	password: ''
}

export const shippingAddressDefaultValues = {
	fullName: 'Tish Tosh',
	streetAddress: '225 kensington ave',
	streetAddress2: '4',
	city: 'slc',
	zipCode: '12345',
	state: 'Utah',
	country: 'US',
}
