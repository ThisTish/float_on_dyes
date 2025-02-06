import { transform } from "next/dist/build/swc/generated-native";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)'
				},
				darkGreen: 'var(--darkGreen)',
				lightGreen: 'var(--lightGreen)',
				darkBlue: 'var(--darkBlue)',
				lightBlue: 'var(--lightBlue)',
				brightBlue: 'var(--brightBlue)',
				lightCta: 'var(--lightCta)',
				darkCta: 'var(--darkCta)',
				card: {
					DEFAULT: 'var(--card)',
					foreground: 'var(--card-foreground)'
				},
				popover: {
					DEFAULT: 'var(--popover)',
					foreground: 'var(--popover-foreground)'
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)'
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)'
				},
				border: {
					DEFAULT: 'var(--border)',
					opposite: 'var(--border-opposite)'
				},
				input: 'var(--input)',
				ring: 'var(--ring)',
				chart: {
					'1': 'var(--chart-1)',
					'2': 'var(--chart-2)',
					'3': 'var(--chart-3)',
					'4': 'var(--chart-4)',
					'5': 'var(--chart-5)'
				}
			},
			borderRadius: {
				DEFAULT: 'var(--radius)',
				sm: 'calc(var(--radius) + 2px)',
				md: 'calc(var(--radius) + 4px)',
				lg: 'calc(var(--radius) + 6px)',
				xl: 'calc(var(--radius) + 8px)'
			},
			borderWidth: {
				DEFAULT: 'var(--border-width)',
				0: '0',
				2: 'calc(var(--border-width) + 2px)',
				4: 'calc(var(--border-width) +  4px)',
				8: 'calc(var(--border-width) + 8px)'
			},
			keyframes: {
				'cloud-move': {
					'0%': {
						transform: 'translateX(0px);'
					},
					'40%': {
						transform: 'translateX(4px);'
					},
					'80%': {
						transform: 'translateX(-4px);'
					},
					'100%': {
						transform: 'translateX(0px);'
					},
				},
				'star-twinkle': {
					'0%': {
						transform: 'scale(1);'
					},
					'40%': {
						transform: 'scale(1.2);'
					},
					'80%': {
						transform: 'scale(.8);'
					},
					'100%': {
						transform: 'scale(1);'
					},
				},
				'loading-disc': {
					'0%': {
						backgroundColor: 'var(--darkBlue);'
					},
					'25%': {
						backgroundColor: 'var(--darkGreen);'
					},
					'50%': {
						backgroundColor: 'var(--brightBlue);'
					},
					'75%': {
						backgroundColor: 'var(--lightGreen);'
					},
					'100%': {
						backgroundColor: 'transparent'
					}
				},
				'loading': {
					'0%': {
						opacity: '1',
						color: 'var(--darkBlue);'
					},
					'50%': {
						opacity: '0',
						color: 'var(--darkGreen);'
					},
					'100%': {
						opacity: '1',
						color: 'var(---primary-foreground);'
					},
				}
			},
			animation: {
				'cloud-move': 'cloud-move 6s infinite',
				'star-twinkle': 'star-twinkle 2s infinite',
				'loading-disc': 'loading-disc 4s ease-in-out infinite',
				'loading': 'loading 2s ease-in-out infinite'
			},
			transitionDelay:{
				'400' : '400ms',
				'600' : '600ms',
				'800' : '800ms',
				'1200' : '1200ms',
				'1300' : '1300ms',
				'1400' : '1400ms',
				'1600' : '1600ms',
				'1700': '1700ms',
				'2000': '2000ms',
			},
			fontFamily: {
				'work-sans': 'var(--font-work-sans)',
				'comfortaa': 'var(--font-comfortaa)'
			}
		},
	},
	plugins: [
		require("tailwindcss-animate"),

	],
} satisfies Config;
