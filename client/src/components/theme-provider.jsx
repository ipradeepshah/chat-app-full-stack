"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useSettings } from "@/lib/settings-context"

const ThemeProviderContext = createContext({})

export function ThemeProvider({
  children,
  defaultTheme = "light",
  attribute = "class",
  enableSystem = false,
  disableTransitionOnChange = false,
}) {
  const [theme, setTheme] = useState(defaultTheme)
  const { settings } = useSettings()

  // Update theme when settings change
  useEffect(() => {
    if (settings?.appearance?.darkMode) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [settings?.appearance?.darkMode])

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement

    // Remove old class
    root.classList.remove("light", "dark")

    // Add new class
    root.classList.add(theme)

    // Update data attribute
    if (attribute === "class") {
      root.setAttribute("data-theme", theme)
    } else {
      root.setAttribute(attribute, theme)
    }

    // Disable transitions during theme change if needed
    if (disableTransitionOnChange) {
      document.documentElement.classList.add("disable-transitions")
      window.setTimeout(() => {
        document.documentElement.classList.remove("disable-transitions")
      }, 0)
    }
  }, [theme, attribute, disableTransitionOnChange])

  const value = {
    theme,
    setTheme: (newTheme) => {
      setTheme(newTheme)
    },
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

