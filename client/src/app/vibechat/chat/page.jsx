import React from "react"
import Header from "../../../components/header"
import ChatSidebar  from "../../../components/chat/chat-sidebar"

import { Toaster } from "../../../components/ui/toaster"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ChatSidebar />  {/* Added ChatSidebar component */}
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to Vibe Chat</h1>
      </main>
      <Toaster />
    </div>
  )
}