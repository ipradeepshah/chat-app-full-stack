"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import ChatContact from "./chat-contact"
import CreateGroupModal from "./create-group-modal"

export default function ChatSidebar({ contacts = [], activeContactId, onContactClick }) {
  const [activeTab, setActiveTab] = useState("all")
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)

  // Memoize filteredContacts to optimize performance
  const filteredContacts = useMemo(() => {
    if (activeTab === "group") {
      return contacts?.filter((contact) => contact.isGroup) || []
    }
    return contacts || []
  }, [activeTab, contacts])

  return (
    <div className="w-64 border-r border-gray-200 flex flex-col h-full">
      {/* Tabs for switching between All Chats and Groups */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All chats</TabsTrigger>
          <TabsTrigger value="group">Group</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Create Group Button (visible only in Group tab) */}
      {activeTab === "group" && (
        <div className="p-2">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-1"
            onClick={() => setIsCreateGroupOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Group
          </Button>
        </div>
      )}

      {/* Scrollable Area for Contacts */}
      <ScrollArea className="flex-1">
        <div className="px-1 py-2">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ChatContact
                key={contact.id}
                contact={contact}
                isActive={activeContactId === contact.id}
                onClick={() => onContactClick(contact)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No contacts available</p>
          )}
        </div>
      </ScrollArea>

      {/* Create Group Modal */}
      <CreateGroupModal isOpen={isCreateGroupOpen} onClose={() => setIsCreateGroupOpen(false)} />
    </div>
  )
}

// Default props to ensure the component works without explicit props
ChatSidebar.defaultProps = {
  contacts: [],
  activeContactId: null,
  onContactClick: () => {},
}