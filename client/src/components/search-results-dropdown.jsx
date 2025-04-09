"use client"

import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function SearchResultsDropdown({ results, onSendFriendRequest }) {
  const getColorClass = (color) => {
    const colorMap = {
      green: "bg-green-500",
      red: "bg-red-500",
      blue: "bg-blue-500",
      orange: "bg-orange-500",
      indigo: "bg-indigo-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
    }

    return colorMap[color] || "bg-gray-500"
  }

  return (
    <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-80 overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
      <div className="p-2 text-sm text-gray-500 border-b border-gray-100 dark:text-gray-400 dark:border-gray-800">
        {results.length} {results.length === 1 ? "user" : "users"} found
      </div>

      <div className="py-1">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getColorClass(user.avatar)}`}
              >
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium dark:text-white">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => onSendFriendRequest(user.id)}
              title="Send friend request"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

