import type { Metadata } from "next"
import "./globals.css"
import { Work_Sans, Comfortaa } from 'next/font/google'
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { ThemeProvider } from "@/components/theme-provider"

const comfortaa = Comfortaa({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,},
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${comfortaa.className} antialiased`}
      >
        <ThemeProvider
        attribute={'class'}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
