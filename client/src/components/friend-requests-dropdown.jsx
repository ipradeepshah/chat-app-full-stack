"use client"

import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export default function FriendRequestsDropdown({ requests, onAccept, onReject }) {
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
    <div className="absolute right-0 top-12 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-medium dark:text-white">Friend Requests</h3>
      </div>

      {requests.length === 0 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">No pending friend requests</div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {requests.map((request) => (
            <div key={request.id} className="p-3 border-b border-gray-100 last:border-0 dark:border-gray-800">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getColorClass(request.avatar)}`}
                >
                  {request.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="font-medium dark:text-white">{request.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">@{request.username}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{request.timestamp}</div>

                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="h-8 flex-1" onClick={() => onAccept(request.id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 flex-1 dark:border-gray-700 dark:text-gray-300"
                      onClick={() => onReject(request.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

