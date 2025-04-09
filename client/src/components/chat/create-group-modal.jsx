"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import { Check, X } from "lucide-react"
import { Badge } from "../ui/badge"

// Mock data for contacts
const availableContacts = [
  { id: 1, name: "Ram", color: "green", online: true },
  { id: 2, name: "Hari", color: "red", online: false },
  { id: 3, name: "Sita", color: "orange", online: true },
  { id: 4, name: "Shyam", color: "blue", online: false },
  { id: 6, name: "Maya", color: "purple", online: true },
  { id: 7, name: "Raj", color: "pink", online: false },
]

export default function CreateGroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState([])

  const filteredContacts = availableContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleContact = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const removeContact = (contactId) => {
    setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
  }

  const handleCreateGroup = () => {
    // Here you would typically send this data to your backend
    console.log("Creating group:", {
      name: groupName,
      members: selectedContacts,
    })

    // Reset form and close modal
    setGroupName("")
    setSearchQuery("")
    setSelectedContacts([])
    onClose()
  }

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {selectedContacts.length > 0 && (
            <div>
              <Label>Selected Members ({selectedContacts.length})</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedContacts.map((contactId) => {
                  const contact = availableContacts.find((c) => c.id === contactId)
                  if (!contact) return null

                  return (
                    <Badge key={contact.id} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      <span>{contact.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => removeContact(contact.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="search-contacts">Add Members</Label>
            <Input
              id="search-contacts"
              placeholder="Search contacts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-60">
            <div className="space-y-1">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  onClick={() => toggleContact(contact.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getColorClass(contact.color)}`}
                    >
                      {contact.name.charAt(0)}
                    </div>
                    <span>{contact.name}</span>
                    {contact.online && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
                  </div>

                  {selectedContacts.includes(contact.id) && <Check className="h-4 w-4 text-green-500" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} disabled={!groupName || selectedContacts.length === 0}>
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

