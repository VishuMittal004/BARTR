import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types";
import { SkillBadge } from "@/components/shared/skill-badge";
import { MapPin, MessageSquare, UserCircle } from "lucide-react";
import Link from "next/link";

interface UserCardProps {
  user: UserProfile;
}

export function UserProfileCard({ user }: UserCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start gap-4">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={64}
            height={64}
            className="rounded-full h-16 w-16 object-cover border"
            data-ai-hint="person avatar"
          />
        ) : (
          <UserCircle className="h-16 w-16 text-muted-foreground" />
        )}
        <div className="flex-1">
          <CardTitle className="text-xl">{user.name}</CardTitle>
          {user.location && (
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" /> {user.location}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {user.bio && <p className="text-sm text-muted-foreground line-clamp-3">{user.bio}</p>}
        <div>
          <h4 className="text-sm font-semibold mb-1">Skills Offered:</h4>
          <div className="flex flex-wrap gap-1">
            {user.skillsOffered.slice(0, 5).map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
            {user.skillsOffered.length > 5 && <SkillBadge skill={`+${user.skillsOffered.length - 5} more`} />}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Skills Wanted:</h4>
          <div className="flex flex-wrap gap-1">
            {user.skillsWanted.slice(0, 5).map((skill) => (
              <SkillBadge key={skill} skill={skill} variant="outline" />
            ))}
            {user.skillsWanted.length > 5 && <SkillBadge skill={`+${user.skillsWanted.length - 5} more`} variant="outline" />}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 pt-4 border-t">
        <Link href={`/profile/${user.id}`} passHref legacyBehavior>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">View Profile</Button>
        </Link>
        <Link href={`/messaging?with=${user.id}`} passHref legacyBehavior>
          <Button size="sm" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            <MessageSquare className="mr-2 h-4 w-4" /> Message
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
