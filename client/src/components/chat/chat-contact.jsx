"use client"

import { Badge } from "../ui/badge"

export default function ChatContact({ contact, isActive, onClick }) {
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
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
        isActive ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getColorClass(contact.color)}`}
        >
          {contact.name.charAt(0)}
        </div>
        {contact.online && (
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
        )}
      </div>

      <span className="flex-1 truncate">{contact.name}</span>

      {contact.unread > 0 && (
        <Badge variant="destructive" className="rounded-full h-5 min-w-5 flex items-center justify-center">
          {contact.unread}
        </Badge>
      )}
    </div>
  )
}

