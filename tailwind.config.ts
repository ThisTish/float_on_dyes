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
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>, options?: { variants?: string[], respectPrefix?: boolean, respectImportant?: boolean }) => void }) {
			addUtilities({
				'.mask': {
					maskImage: 'url("/inkmask.webp")',
					WebkitMaskImage: 'url("/inkmask.webp")'
				},
				'.mask-cover': {
					maskSize: 'cover',
					WebkitMaskSize: 'cover'
				}	
			})
		})
	],
} satisfies Config;
