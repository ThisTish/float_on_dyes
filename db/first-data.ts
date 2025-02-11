const firstData = {
	products: [
		{
			name: 'Benny',
			slug: 'benny-planet-pull',
			brand: 'Lonestar',
			category: 'dyed',
			plastic: 'premium',
			description: "The Benny is a beaded, straight-to-stable putter. It promises a consistent and straight flight with a touch of reliable fade at the end of its flight: an ideal throwing putter.",
			images: ['/images/benny.jpg', '/images/insanity.jpg', '/images/kratos.jpg'],
			discType: [
				'putter'
			],
			tags: [
				'putter', 'floetrol', 'cells', 'pull'
			],
			color: [
				'blue', 'purple', 'yellow'
			],
			dyeType: ['planet pull'],
			price: 30.99,
			speed: 3,
			glide: 4,
			turn: 0,
			fade: 2,
			weight: 170,
			isAvailable: false,
			isFeatured: true, 
			isDiscounted: false,
		},
		{
			name: 'Cloud Breaker',
			slug: 'cloud-breaker-cell-swirl',
			brand: 'Discmania',
			category: 'dyed',
			plastic: 'Horizon',
			description: "Now featuring Horizon plastic, this Cloud Breaker flies reliably overstable while keeping the glide needed to reach elite distances. The Cloud Breaker is the tool you need to harness your ultimate potential and unleash maximum distance. Whether you are fighting a headwind, bombing a fairway, or shaping epic hyzer lines - the Cloud Breaker gives you the confidence to throw like the pros.",
			images: ['/images/cloudbreaker.jpg', '/images/passion.jpg'],
			discType: [
				'distance driver', 'pro series', 'special edition'
			],
			tags: [
				'distance driver', 'floetrol', 'cells', 'swirl', 'overstable'
			],
			color: [
				'blue', 'purple', 'pink'
			],
			dyeType: ['layered circle pull'],
			price: 30.99,
			speed: 12,
			glide: 5,
			turn: -1,
			fade: 3,
			weight: 172,
			isAvailable: false,
			isFeatured: true, 
			isDiscounted: false,
		},
		{
			name: 'Hex',
			slug: 'lizotte-hex-axolotl',
			brand: 'Axiom',
			plastic: 'Total Eclipse Glow',
			description: "Mesmerizingly straight, with flight numbers of 5/5/-1/1, the Hex will find a place in anyone’s bag as a versatile and reliably straight midrange. At the highest arm speeds, the Hex will produce slightly understable lines from flat, but the 1 fade keeps it from flipping over completely. For lower arm speeds, the Hex has enough turn to make shaping lines a breeze. If you are looking for control in the woods, or simply a versatile line shaper, the Hex is the midrange for you.",
			category: 'dyed',
			images: ['/images/hex.jpg', '/images/vortex.jpg', '/images/benny.jpg', '/images/cloudbreaker.jpg'],
			discType: [
				'midrange', 'pro series', 'special edition', 'glow'
			],
			tags: [
				'midrange', 'floetrol', 'cells', 'swirl', 'glow', 'stable'
			],
			color: [
				'blue', 'red', 'yellow', 'orange', 'green'
			],
			dyeType: ['swirl pull'],
			price: 30.99,
			speed: 5,
			glide: 5,
			turn: -1,
			fade: 1,
			weight: 168.2,
			isAvailable: true,
			isFeatured: true, 
			isDiscounted: false,
		}
	]
}

export default firstData;