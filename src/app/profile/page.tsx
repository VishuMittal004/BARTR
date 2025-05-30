import { ProfileForm } from "@/components/profile/profile-form";
import type { UserProfile } from "@/types";

// Mock data for an existing user - in a real app, this would come from your backend
const mockExistingUser: UserProfile = {
  id: "user123",
  name: "Vikram Patel",
  avatarUrl: "https://placehold.co/96x96.png",
  bio: "Experienced full-stack developer passionate about open source and building innovative solutions. Looking to collaborate on exciting projects and learn new things.",
  skillsOffered: ["React Development", "Node.js Backend", "API Design", "Database Management"],
  skillsWanted: ["UI/UX Design", "Mobile App Development (Flutter)", "Project Management"],
  location: "Mumbai, India",
};

export default function UserProfilePage() {
  // For demonstration, we'll pass mock data. 
  // In a real app, you'd fetch the current user's data or pass undefined if it's a new profile.
  const isNewUser = false; // Change to true to simulate new user profile creation

  return (
    <div className="container mx-auto py-8">
      <ProfileForm initialData={isNewUser ? undefined : mockExistingUser} />
    </div>
  );
}
