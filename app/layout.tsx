import type { Metadata } from "next"
import "./globals.css"
import { Outfit } from 'next/font/google'
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"


const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit'
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,},
  description: APP_DESCRIPTION      
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}
      >
        <SessionProvider>
        <ThemeProvider
        attribute={'class'}
        defaultTheme="system"
        enableSystem
        >
        {children}
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
