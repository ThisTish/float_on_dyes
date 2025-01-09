import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        darkGreen: "var(--darkGreen)",
        lightGreen: "var(--lightGreen)",
        darkBlue: "var(--darkBlue)",
        lightBlue: "var(--lightBlue)",
        brightBlue: "var(--brightBlue)",
        lightCta: "var(--lightCta)",
        darkCta: "var(--darkCta)",

      },
    },
  },
  plugins: [],
} satisfies Config;
