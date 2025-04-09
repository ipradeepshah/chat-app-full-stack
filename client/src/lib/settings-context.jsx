"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Default settings
const defaultSettings = {
  notifications: {
    messages: true,
    friendRequests: true,
  },
  appearance: {
    darkMode: false,
  },
  privacy: {
    onlineStatus: true,
    readReceipts: true,
  },
}

// Create context
const SettingsContext = createContext(undefined)

export function SettingsProvider({ children }) {
  // Initialize state with default settings or from localStorage if available
  const [settings, setSettings] = useState(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedSettings = localStorage.getItem("vibeChat_settings")
    if (storedSettings) {
      try {
        setSettings(JSON.parse(storedSettings))
      } catch (error) {
        console.error("Failed to parse stored settings:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("vibeChat_settings", JSON.stringify(settings))

      // Apply dark mode
      if (settings.appearance.darkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [settings, isLoaded])

  // Function to update a specific setting
  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  return <SettingsContext.Provider value={{ settings, updateSetting }}>{children}</SettingsContext.Provider>
}

// Custom hook to use settings
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

