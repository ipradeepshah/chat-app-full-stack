import { Button } from "../ui/button"
import { User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useSettings } from "../../lib/settings-context"

export default function ProfileDropdown() {
  const { settings } = useSettings()

  return (
    <div className="absolute right-0 top-12 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">U</div>
          <div>
            <div className="font-medium dark:text-white">User Name</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">user@example.com</div>
          </div>
        </div>
      </div>

      <div className="p-2">
        <Link href="/profile" className="block">
          <Button variant="ghost" className="w-full justify-start dark:text-gray-300 dark:hover:text-white" size="sm">
            <User className="h-4 w-4 mr-2" />
            My Profile
          </Button>
        </Link>

        <Link href="/settings" className="block">
          <Button variant="ghost" className="w-full justify-start dark:text-gray-300 dark:hover:text-white" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
            {settings.appearance.darkMode && (
              <span className="ml-auto text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded">Dark</span>
            )}
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          size="sm"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}

