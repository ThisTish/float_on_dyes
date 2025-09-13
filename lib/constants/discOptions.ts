export const dyeTypes = [
	{
		name: "abstract cells",
		fragment: "abstract_cells",
		images: [
			'/images/discs/cloudbreaker.png',
			'/images/discs/cloudbreaker.jpg',
			'/images/discs/benny.jpg',
			'/images/discs/hex.jpg',
			'/images/discs/passion.jpg'
		]
	},
	{
		name: "abstract pour",
		fragment: "abstract_pour",
		images: [
			'/images/discs/hex.jpg',
			'/images/discs/passion.jpg',
			'/images/discs/insanity.jpg',
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "blowout cells",
		fragment: "blowout_cells",
		images: [
			'/images/discs/insanity.jpg',
			'/images/discs/passion.jpg',
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "circle cells",
		fragment: "circle_cells",
		images: [
			'/images/discs/cloudbreaker.png',
			'/images/discs/passion.jpg'
		],
		extra: 5
	},
	{
		name: "feather",
		fragment: "feather",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "flower",
		fragment: "flower",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "planet cells",
		fragment: "planet_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "rainbow cells",
		fragment: "rainbow_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "solid back fill",
		fragment: "solid_back_fill",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spiderweb cells",
		fragment: "spiderweb_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spin dye gradient",
		fragment: "spin_dye_gradient",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spin dye lines",
		fragment: "spin_dye_lines",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spiral cells",
		fragment: "spiral_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spiral lines",
		fragment: "spiral_lines",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spiral pour",
		fragment: "spiral_pour",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "spiral wave",
		fragment: "spiral_wave",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "starburst in",
		fragment: "starburst_in",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "starburst out",
		fragment: "starburst_out",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "stencil(cell fill)",
		fragment: "stencil_cell_fill",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "stencil(negative space)",
		fragment: "stencil_negative_space",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "stencil(solid fill)",
		fragment: "stencil_solid_fill",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "swipe cells",
		fragment: "swipe_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "twisted cells",
		fragment: "twisted_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	},
	{
		name: "wave cells",
		fragment: "wave_cells",
		images: [
			'/images/discs/cloudbreaker.png'
		]
	}
]

export const RIMOPTIONS = ['Rim Spin', 'Rim Dip', 'Full Back Dip'] as const
export const STAMPOPTIONS = ['Glue Mask', 'Wipe Stamp'] as const

export const BRANDS = [
	{
		name: 'MVP',
		image: '/images/logos/MVP.svg',
	},
	{
		name: 'Discraft',
		image: '/images/logos/Discraft.svg',
	},
	{
		name: 'Innova',
		image: '/images/logos/Innova.svg',
	},
	{
		name: 'Dynamic Discs',
		image: '/images/logos/DynamicDiscs.svg',
	},
	{
		name: 'Latitude 64',
		image: '/images/logos/Latitude64.svg',
	},
	{
		name: 'Trash Panda',
		image: '/images/logos/TrashPanda.svg',
	},
	{
		name: 'DGA',
		image: '/images/logos/DGA.svg',
	},
	{
		name: 'Discmania',
		image: '/images/logos/Discmania.svg',
	},
	{
		name: 'Axiom',
		image: '/images/logos/Axiom.svg',
	},
	{
		name: 'Clash',
		image: '/images/logos/Clash.svg',
	},
	{
		name: 'Handeye',
		image: '/images/logos/Handeye.svg',
	},
	{
		name: 'Infinite',
		image: '/images/logos/Infinite.svg',
	},
	{
		name: 'Kastaplast',
		image: '/images/logos/Kastaplast.svg',
	},
	{
		name: 'Lone Star',
		image: '/images/logos/LoneStar.svg',
	},
	{
		name: 'Mint',
		image: '/images/logos/Mint.svg',
	},
	{
		name: 'Streamline',
		image: '/images/logos/Streamline.svg',
	},
	// {
	// 	name: 'Prodigy',
	// 	image: '/images/logos/Prodigy.svg',
	// },
	{
		name: 'Thought Space',
		image: '/images/logos/ThoughtSpace.svg',
	},
	{
		name: 'Westside',
		image: '/images/logos/Westside.svg',
	}
]

export const BRAND_OPTIONS = BRANDS.map((brand) => ({
	value: brand.name,
	label: brand.name
}))

export const DISC_TYPES = [
	{
		value: 'Distance Driver',
		label: 'Distance Driver'
	},
	{
		value: 'Fairway Driver',
		label: 'Fairway Driver'
	},
	{
		value: 'Midrange',
		label: 'Midrange'
	},
	{
		value: 'Putter',
		label: 'Putter'
	},
	{
		value: 'Glow',
		label: 'Glow'
	},
	{
		value: 'Blanks',
		label: 'Blanks & Dyeables'
	},
	{
		value: 'Sale',
		label: 'Sale'
	},
	{
		value: 'Special Edition',
		label: 'Special Edition & Rare'
	},
	{
		value: 'Preowned',
		label: 'Preowned'
	},
	{
		value: 'Floetrol',
		label: 'Floetrol'
	},
	{
		value: 'Glue Bed',
		label: 'Glue Bed'
	},
	{
		value: 'Vinyl Cut',
		label: 'Vinyl Cut'
	}
]

// sorting options for shop
export const SORT_OPTIONS = [
	{
		value: 'Latest',
		label: 'Latest'
	},
	{
		value: 'Oldest',
		label: 'Oldest'
	},
	{
		value: 'LowPrice',
		label: 'Price: Low to High'
	},
	{
		value: 'HighPrice',
		label: 'Price: High to Low'
	},
	{
		value: 'Speed',
		label: 'Speed'
	},
	{
		value: 'Brand',
		label: 'Brand'
	},
]