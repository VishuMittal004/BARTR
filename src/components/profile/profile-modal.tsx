"use client";

import { UserProfile } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, MapPin, Star, AlertCircle, Clock, Calendar, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileModalProps {
  profile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ profile, isOpen, onClose }: ProfileModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (!profile) {
    return null;
  }

  const handleMessageClick = () => {
    setIsLoading(true);
    // Navigate to messaging page with the user's ID
    router.push(`/messaging?userId=${profile.id}`);
  };

  // Random ratings and dates for the mock profile
  const rating = (Math.random() * 2 + 3).toFixed(1); // Rating between 3.0 and 5.0
  const memberSince = new Date(
    Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 3
  ).toLocaleDateString(); // Member for up to 3 years
  const responseTime = Math.floor(Math.random() * 12) + 1; // 1-12 hours

  // Random success stats
  const completedBarters = Math.floor(Math.random() * 30) + 1;
  const successRate = Math.floor(Math.random() * 30) + 70; // 70-99%

  // Calculate common skills (for demo purposes, just show a percentage match)
  const matchPercentage = Math.floor(Math.random() * 40) + 60; // 60-99% match

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl font-varela-round">{profile.name}</DialogTitle>
              <DialogDescription className="flex items-center mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {profile.location}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill, index) => (
                  <Badge key={index} className="bg-primary/10 hover:bg-primary/20 text-primary border-none">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Skills Wanted</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill, index) => (
                  <Badge key={index} className="bg-accent/10 hover:bg-accent/20 text-accent border-none">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Barter History</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">Completed Barters</h4>
                  </div>
                  <p className="text-2xl font-semibold">{completedBarters}</p>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">Success Rate</h4>
                  </div>
                  <p className="text-2xl font-semibold">{successRate}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-lg font-semibold mb-3">Profile Overview</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Skill Match</span>
                    <span className="font-medium">{matchPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${matchPercentage}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1.5" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <span className="font-semibold">{rating}/5.0</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-1.5" />
                    <span className="text-sm">Member since</span>
                  </div>
                  <span className="text-sm">{memberSince}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1.5" />
                    <span className="text-sm">Avg. response time</span>
                  </div>
                  <span className="text-sm">{responseTime} hours</span>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 rounded-lg p-4 border border-border">
              <h3 className="text-md font-semibold mb-2">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">
                Completed a skill exchange in {profile.skillsOffered[0]} last week
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="outline" onClick={onClose} className="sm:flex-1">
            Close
          </Button>
          <Button 
            onClick={handleMessageClick} 
            className="sm:flex-1 bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {isLoading ? "Redirecting..." : "Message Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
