import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SkillBadge } from "@/components/shared/skill-badge";
import type { UserProfile } from "@/types";
import { Briefcase, Lightbulb, MapPin, MessageSquare, UserCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock function to fetch user profile by ID
async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const mockUsers: UserProfile[] = [
    { id: "user1", name: "Aarav Sharma", avatarUrl: "https://placehold.co/128x128.png?text=AS", bio: "Creative UI/UX designer with a passion for crafting beautiful and intuitive digital experiences. Loves collaborating on innovative projects and exploring new design trends. Always open to learning and sharing knowledge.", skillsOffered: ["UI/UX Design", "Illustration", "Prototyping", "Figma"], skillsWanted: ["React Development", "Node.js", "Project Management"], location: "Mumbai, Maharashtra" },
    { id: "user2", name: "Nisha Patel", avatarUrl: "https://placehold.co/128x128.png?text=NP", bio: "Experienced full-stack developer specializing in web applications. Proficient in Python, Django, and JavaScript. Enjoys tackling complex problems and building scalable solutions. Looking for marketing or content creation partnerships.", skillsOffered: ["Web Development", "Python", "Django", "API Integration"], skillsWanted: ["Marketing Strategy", "Content Writing", "SEO"], location: "Bangalore, Karnataka" },
  ];
  return mockUsers.find(user => user.id === userId) || null;
}


export default async function UserProfileViewPage({ params }: { params: { userId: string } }) {
  const user = await getUserProfile(params.userId);

  if (!user) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-semibold">User Not Found</h1>
        <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          {user.avatarUrl ? (
            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary shadow-lg">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar"/>
              <AvatarFallback className="text-4xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <UserCircle className="h-32 w-32 mx-auto mb-4 text-muted-foreground" />
          )}
          <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
          {user.location && (
            <CardDescription className="flex items-center justify-center gap-1 text-lg">
              <MapPin className="h-5 w-5" /> {user.location}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {user.bio && (
            <div className="text-center">
              <p className="text-muted-foreground px-4 py-3 bg-muted/50 rounded-md text-left">{user.bio}</p>
            </div>
          )}
          <Separator />
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Skills Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map(skill => <SkillBadge key={skill} skill={skill} className="text-base px-3 py-1" />)}
            </div>
          </div>
          <Separator />
          <div>
             <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Skills Wanted
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map(skill => <SkillBadge key={skill} skill={skill} variant="outline" className="text-base px-3 py-1" />)}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
            <Link href={`/messaging?with=${user.id}`}>
              <MessageSquare className="mr-2 h-5 w-5" /> Message {user.name.split(' ')[0]}
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Propose Barter (mock)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// This function is needed for Next.js to know which dynamic segments to pre-render if using SSG.
// For SSR/ISR, this might not be strictly necessary or could return an empty array.
// For this example, we'll assume dynamic rendering for all user profiles.
// export async function generateStaticParams() {
//   // In a real app, fetch all user IDs here
//   // const users = await fetchAllUserIds(); 
//   // return users.map(user => ({ userId: user.id }));
//   return [{ userId: 'user1' }, { userId: 'user2' }]; // Example
// }
