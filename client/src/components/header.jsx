"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { User, Search, UserPlus } from "lucide-react"
import ProfileDropdown from "./profile/profile-dropdown"
import SearchResultsDropdown from "./search-results-dropdown"
import FriendRequestsDropdown from "./friend-requests-dropdown"
import { useSettings } from "../lib/settings-context"
import { useToast } from "./ui/use-toast"

// Mock user data for search
const mockUsers = [
  { id: "u1", name: "Alex Johnson", username: "alexj", avatar: "green" },
  { id: "u2", name: "Priya Sharma", username: "priyash", avatar: "purple" },
  { id: "u3", name: "Carlos Rodriguez", username: "carlosr", avatar: "blue" },
  { id: "u4", name: "Emma Wilson", username: "emmaw", avatar: "pink" },
  { id: "u5", name: "David Kim", username: "davidk", avatar: "orange" },
  { id: "u6", name: "Sophia Chen", username: "sophiac", avatar: "red" },
  { id: "u7", name: "James Smith", username: "jamess", avatar: "indigo" },
]

// Mock friend requests data
const mockFriendRequests = [
  { id: "fr1", userId: "u2", name: "Priya Sharma", username: "priyash", avatar: "purple", timestamp: "2 hours ago" },
  { id: "fr2", userId: "u5", name: "David Kim", username: "davidk", avatar: "orange", timestamp: "1 day ago" },
  { id: "fr3", userId: "u7", name: "James Smith", username: "jamess", avatar: "indigo", timestamp: "3 days ago" },
]

export default function Header() {
  const { settings } = useSettings()
  const { toast } = useToast()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isFriendRequestsOpen, setIsFriendRequestsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests)

  const searchRef = useRef(null)
  const friendRequestsRef = useRef(null)

  // Filter users based on search query
  const searchResults =
    searchQuery.trim() !== ""
      ? mockUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : []

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false)
      }

      if (friendRequestsRef.current && !friendRequestsRef.current.contains(event.target)) {
        setIsFriendRequestsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSendFriendRequest = (userId) => {
    console.log(`Sending friend request to user: ${userId}`)
    // Here you would typically call an API to send the friend request

    // Show notification based on settings
    if (settings.notifications.friendRequests) {
      toast({
        title: "Friend request sent",
        description: `Your request has been sent successfully.`,
        duration: 3000,
      })
    }
  }

  const handleAcceptFriendRequest = (requestId) => {
    console.log(`Accepting friend request: ${requestId}`)
    // Remove the request from the list
    const request = friendRequests.find((req) => req.id === requestId)
    setFriendRequests(friendRequests.filter((request) => request.id !== requestId))

    // Show notification based on settings
    if (settings.notifications.friendRequests) {
      toast({
        title: "Friend request accepted",
        description: `You are now friends with ${request?.name || "the user"}.`,
        duration: 3000,
      })
    }
  }

  const handleRejectFriendRequest = (requestId) => {
    console.log(`Rejecting friend request: ${requestId}`)
    // Remove the request from the list
    setFriendRequests(friendRequests.filter((request) => request.id !== requestId))

    // Show notification based on settings
    if (settings.notifications.friendRequests) {
      toast({
        title: "Friend request rejected",
        description: "The request has been declined.",
        duration: 3000,
      })
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-xl font-bold dark:text-white">Vibe Chat</div>

        <div className="flex-1 max-w-md mx-4 relative" ref={searchRef}>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search to add friend"
              className="w-full pl-9 dark:bg-gray-900 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {isSearchFocused && searchResults.length > 0 && (
            <SearchResultsDropdown results={searchResults} onSendFriendRequest={handleSendFriendRequest} />
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={friendRequestsRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => setIsFriendRequestsOpen(!isFriendRequestsOpen)}
            >
              <UserPlus className="h-5 w-5" />
              {friendRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {friendRequests.length}
                </span>
              )}
            </Button>

            {isFriendRequestsOpen && (
              <FriendRequestsDropdown
                requests={friendRequests}
                onAccept={handleAcceptFriendRequest}
                onReject={handleRejectFriendRequest}
              />
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <User className="h-5 w-5" />
          </Button>

          {isProfileOpen && <ProfileDropdown />}
        </div>
      </div>
    </header>
  )
}

