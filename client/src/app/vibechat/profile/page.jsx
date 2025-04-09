import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="container max-w-2xl py-8">
      <div className="flex items-center mb-6">
        <Link href="/chat">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full bg-purple-500 flex items-center justify-center text-white text-3xl mb-4">
          U
        </div>
        <Button variant="outline" size="sm">
          Change Avatar
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Display Name</label>
          <Input defaultValue="User Name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <Input defaultValue="username" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input defaultValue="user@example.com" type="email" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">About</label>
          <Textarea defaultValue="Hey there! I'm using Vibe Chat." />
        </div>

        <Button className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

