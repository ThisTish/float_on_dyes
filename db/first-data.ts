import { emailVerification } from "@/lib/actions/email.actions";
import { hashSync } from "bcrypt-ts-edge";

const firstData = {
	users: [
		{
			name: 'tosh',
			email: 'tosh@gmail.com',
			password: hashSync('123456', 10),
			role: 'admin',
			emailVerified: new Date()
			
		},
		{
			name: 'user',
			email: 'user@gmail.com',
			password: hashSync('123456', 10),
			role: 'user',
			emailVerified: new Date()

		}
	],

	products: [
		{
			name: 'Insanity',
			slug: 'insanity-swirl',
			brand: 'MVP',
			category: 'dyed',
			plastic: 'glow',
			description: "The Benny is a beaded, straight-to-stable putter. It promises a consistent and straight flight with a touch of reliable fade at the end of its flight: an ideal throwing putter.",
			images: ['/images/discs/insanity.jpg', '/images/discs/kratos.jpg'],
			discType: [
				'fairway driver'
			],
			tags: [
				'glow', 'driver', 'swirl', 'pull'
			],
			color: [
				'red', 'orange', 'yellow'
			],
			dyeType: 'swirl',
			price: 30.99,
			speed: 9,
			glide: 5,
			turn: -1,
			fade: 2,
			weight: 170,
			stock: 1,
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
			images: ['/images/discs/cloudbreaker.jpg', '/images/discs/passion.jpg'],
			discType: [
				'distance driver', 'pro series', 'special edition'
			],
			tags: [
				'distance driver', 'floetrol', 'cells', 'swirl', 'overstable'
			],
			color: [
				'blue', 'purple', 'pink'
			],
			dyeType: 'layered circle pull',
			price: 30.99,
			speed: 12,
			glide: 5,
			turn: -1,
			fade: 3,
			weight: 172,
			stock: 2,
			isAvailable: false,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Kratos',
			slug: 'kratos-cell-swirl',
			brand: 'Discraft',
			category: 'dyed',
			plastic: 'z-flex',
			description: "Now featuring Horizon plastic, this Cloud Breaker flies reliably overstable while keeping the glide needed to reach elite distances. The Cloud Breaker is the tool you need to harness your ultimate potential and unleash maximum distance. Whether you are fighting a headwind, bombing a fairway, or shaping epic hyzer lines - the Cloud Breaker gives you the confidence to throw like the pros.",
			images: ['/images/discs/kratos.jpg', '/images/discs/passion.jpg'],
			discType: [
				'putter', 'pro series', 'special edition'
			],
			tags: [
				'putter', 'floetrol', 'cells', 'swirl', 
			],
			color: [
				'blue', 'purple', 'yellow'
			],
			dyeType: 'layered circle pull',
			price: 30.99,
			speed: 2,
			glide: 5,
			turn: -1,
			fade: 1,
			weight: 172,
			stock: 2,
			isAvailable: true,
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
			images: ['/images/discs/hex.jpg', '/images/discs/vortex.jpg', '/images/discs/benny.jpg', '/images/discs/cloudbreaker.jpg'],
			discType: [
				'midrange', 'pro series', 'special edition', 'glow'
			],
			tags: [
				'midrange', 'floetrol', 'cells', 'swirl', 'glow', 'stable'
			],
			color: [
				'blue', 'red', 'yellow', 'orange', 'green'
			],
			dyeType: 'swirl pull',
			price: 30.99,
			speed: 5,
			glide: 5,
			turn: -1,
			fade: 1,
			weight: 168.2,
			stock: 1,
			isAvailable: true,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Benny',
			slug: 'benny-planet-pull',
			brand: 'Lonestar',
			plastic: 'Total Eclipse Glow',
			description: "Mesmerizingly straight, with flight numbers of 5/5/-1/1, the Hex will find a place in anyone’s bag as a versatile and reliably straight midrange. At the highest arm speeds, the Hex will produce slightly understable lines from flat, but the 1 fade keeps it from flipping over completely. For lower arm speeds, the Hex has enough turn to make shaping lines a breeze. If you are looking for control in the woods, or simply a versatile line shaper, the Hex is the midrange for you. Mesmerizingly straight, with flight numbers of 5/5/-1/1, the Hex will find a place in anyone’s bag as a versatile and reliably straight midrange. At the highest arm speeds, the Hex will produce slightly understable lines from flat, but the 1 fade keeps it from flipping over completely. For lower arm speeds, the Hex has enough turn to make shaping lines a breeze. If you are looking for control in the woods, or simply a versatile line shaper, the Hex is the midrange for you.",
			category: 'dyed',
			images: ['/images/discs/benny.jpg', '/images/discs/vortex.jpg',  '/images/discs/cloudbreaker.jpg'],
			discType: [
				'putter', 'special edition'
			],
			tags: [
				'putter', 'floetrol', 'cells', 'swirl', 'stable'
			],
			color: [
				'blue', 'red', 'yellow', 'orange', 'green'
			],
			dyeType: 'swirl pull',
			price: 30.99,
			speed: 3,
			glide: 3,
			turn: -1,
			fade: 1,
			weight: 168.2,
			stock: 0,
			isAvailable: true,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Insanity',
			slug: 'insanity-swirl-none',
			brand: 'MVP',
			category: 'dyed',
			plastic: 'glow',
			description: "The Benny is a beaded, straight-to-stable putter. It promises a consistent and straight flight with a touch of reliable fade at the end of its flight: an ideal throwing putter.",
			images: ['/images/discs/insanity.jpg', '/images/discs/kratos.jpg'],
			discType: [
				'fairway driver'
			],
			tags: [
				'glow', 'driver', 'swirl', 'pull'
			],
			color: [
				'red', 'orange', 'yellow'
			],
			dyeType: 'blank',
			price: 30.99,
			speed: 9,
			glide: 5,
			turn: -1,
			fade: 2,
			weight: 170,
			stock: 1,
			isAvailable: false,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Cloud Breaker',
			slug: 'cloud-breaker-cell-swirl-special',
			brand: 'Discmania',
			category: 'dyed',
			plastic: 'Horizon',
			description: "Now featuring Horizon plastic, this Cloud Breaker flies reliably overstable while keeping the glide needed to reach elite distances. The Cloud Breaker is the tool you need to harness your ultimate potential and unleash maximum distance. Whether you are fighting a headwind, bombing a fairway, or shaping epic hyzer lines - the Cloud Breaker gives you the confidence to throw like the pros.",
			images: ['/images/discs/cloudbreaker.jpg', '/images/discs/passion.jpg'],
			discType: [
				'distance driver', 'pro series', 'special edition'
			],
			tags: [
				'distance driver', 'floetrol', 'cells', 'swirl', 'overstable'
			],
			color: [
				'blue', 'purple', 'pink'
			],
			dyeType: 'special',
			price: 30.99,
			speed: 12,
			glide: 5,
			turn: -1,
			fade: 3,
			weight: 172,
			stock: 2,
			isAvailable: false,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Kratos',
			slug: 'kratos-cell-swirl-none',
			brand: 'Discraft',
			category: 'dyed',
			plastic: 'z-flex',
			description: "Now featuring Horizon plastic, this Cloud Breaker flies reliably overstable while keeping the glide needed to reach elite distances. The Cloud Breaker is the tool you need to harness your ultimate potential and unleash maximum distance. Whether you are fighting a headwind, bombing a fairway, or shaping epic hyzer lines - the Cloud Breaker gives you the confidence to throw like the pros.",
			images: ['/images/discs/kratos.jpg', '/images/discs/passion.jpg'],
			discType: [
				'putter', 'pro series', 'special edition'
			],
			tags: [
				'putter', 'floetrol', 'cells', 'swirl', 
			],
			color: [
				'blue', 'purple', 'yellow'
			],
			dyeType: 'none',
			price: 30.99,
			speed: 2,
			glide: 5,
			turn: -1,
			fade: 1,
			weight: 172,
			stock: 2,
			isAvailable: true,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Hex',
			slug: 'lizotte-hex-axolotl-special',
			brand: 'Axiom',
			plastic: 'Total Eclipse Glow',
			description: "Mesmerizingly straight, with flight numbers of 5/5/-1/1, the Hex will find a place in anyone’s bag as a versatile and reliably straight midrange. At the highest arm speeds, the Hex will produce slightly understable lines from flat, but the 1 fade keeps it from flipping over completely. For lower arm speeds, the Hex has enough turn to make shaping lines a breeze. If you are looking for control in the woods, or simply a versatile line shaper, the Hex is the midrange for you.",
			category: 'dyed',
			images: ['/images/discs/hex.jpg', '/images/discs/vortex.jpg', '/images/discs/benny.jpg', '/images/discs/cloudbreaker.jpg'],
			discType: [
				'midrange', 'pro series', 'special edition', 'glow'
			],
			tags: [
				'midrange', 'floetrol', 'cells', 'swirl', 'glow', 'stable'
			],
			color: [
				'blue', 'red', 'yellow', 'orange', 'green'
			],
			dyeType: 'special',
			price: 30.99,
			speed: 5,
			glide: 5,
			turn: -1,
			fade: 1,
			weight: 168.2,
			stock: 1,
			isAvailable: true,
			isFeatured: true,
			isDiscounted: false,
		},
		{
			name: 'Benny',
			slug: 'benny-planet-pull-none',
			brand: 'Lonestar',
			plastic: 'Total Eclipse Glow',
			description: "Mesmerizingly straight, with flight numbers of 5/5/-1/1, the Hex will find a place in anyone’s bag as a versatile and reliably straight midrange. At the highest arm speeds, the Hex will produce slightly understable lines from flat, but the 1 fade keeps it from flipping over completely. For lower arm speeds, the Hex has enough turn to make shaping lines a breeze. If you are looking for control in the woods, or simply a versatile line shaper, the Hex is the midrange for you. Mesmerizingly straight, with flight numbers of 5/5/-1/1, the Hex will find a place in anyone’s bag as a versatile and reliably straight midrange. At the highest arm speeds, the Hex will produce slightly understable lines from flat, but the 1 fade keeps it from flipping over completely. For lower arm speeds, the Hex has enough turn to make shaping lines a breeze. If you are looking for control in the woods, or simply a versatile line shaper, the Hex is the midrange for you.",
			category: 'dyed',
			images: ['/images/discs/benny.jpg', '/images/discs/vortex.jpg',  '/images/discs/cloudbreaker.jpg'],
			discType: [
				'putter', 'special edition'
			],
			tags: [
				'putter', 'floetrol', 'cells', 'swirl', 'stable'
			],
			color: [
				'blue', 'red', 'yellow', 'orange', 'green'
			],
			dyeType: 'none',
			price: 30.99,
			speed: 3,
			glide: 3,
			turn: -1,
			fade: 1,
			weight: 168.2,
			stock: 0,
			isAvailable: true,
			isFeatured: true,
			isDiscounted: false,
		}
	]
}

export default firstData;