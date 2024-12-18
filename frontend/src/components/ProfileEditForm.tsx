import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ProfileEditForm() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const req = await fetch(`${window.origin}/current_user`);
        if (!req.ok) throw new Error("Failed to fetch user profile");
        const user = await req.json();
        setProfile(user);
      } catch (err) {
        setError("Could not load profile. Please try again later.");
      }
    };
    getUser();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      if (!prev) return undefined;
      return { ...prev, [name]: value };
    });
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`${window.origin}/current_user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: profile?.email,
            password: profile?.password || "",
          },
        }),
      });

      // Check if response has JSON body
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Handle invalid JSON
        throw new Error(errorData.errors?.[0] || "Failed to update profile.");
      }

      // Parse JSON response
      const updatedUser = await response.json();
      console.log("Profile updated:", updatedUser);

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (err: any) {
      console.error(err.message);
      toast({
        title: "Error updating profile",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    updateUser();
    setLoading(false); 
  };

  if (!profile) {
    return error ? (
      <div className="text-red-500">{error}</div>
    ) : (
      <div>Loading...</div>
    );
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
          id="password"
          name="password"
          type="password"
          value={profile.password || ""}
          onChange={handleInputChange}
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
