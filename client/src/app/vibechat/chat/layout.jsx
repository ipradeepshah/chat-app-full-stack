import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { SettingsProvider } from "@/lib/settings-context"
import "../../../app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vibe Chat",
  description: "A modern chat application",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SettingsProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}

