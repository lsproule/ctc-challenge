import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"




export function ProfileEditForm() {
  const { toast } = useToast()

  const [profile, setProfile] = useState<User>()

  useEffect(() => {
    const getUser = async () => {
      const req = await fetch(`${window.origin}/current_user`) 
      const user = await req.json()
      setProfile(user)
    } 
    getUser()

  },[])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev:User | undefined) => {
      if (!prev){
        return undefined
      }
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  if (!profile){
    return
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="email"
          name="password"
          type="password"
          value={profile.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">Update Profile</Button>
    </form>
  )
}

