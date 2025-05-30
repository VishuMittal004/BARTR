"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Users, MessageCircle, UserCircle2, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ProfileModal } from "@/components/profile/profile-modal";
import { mockUsers } from "@/data/mockUsers";
import type { UserProfile } from "@/types";

const skillMatcherSchema = z.object({
  offeredSkills: z.string().min(1, "Please list skills you offer."),
  desiredSkills: z.string().min(1, "Please list skills you desire."),
  userProfileDescription: z.string().optional(),
});

type SkillMatcherFormValues = z.infer<typeof skillMatcherSchema>;

export function SkillMatcher() {
  const router = useRouter();
  const [matchedProfiles, setMatchedProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const form = useForm<SkillMatcherFormValues>({
    resolver: zodResolver(skillMatcherSchema),
    defaultValues: {
      offeredSkills: "",
      desiredSkills: "",
      userProfileDescription: "",
    },
  });

  // Function to match users based on skills
  const findMatchingProfiles = (offeredSkills: string[], desiredSkills: string[]): UserProfile[] => {
    // Filter users where their wanted skills match what you offer
    // and their offered skills match what you want
    return mockUsers.filter(user => {
      // Check if any of user's wanted skills match what you offer
      const userWantsYourSkills = user.skillsWanted.some(skill => 
        offeredSkills.some(yourSkill => 
          skill.toLowerCase().includes(yourSkill.toLowerCase())
        )
      );
      
      // Check if any of user's offered skills match what you want
      const userOffersWhatYouWant = user.skillsOffered.some(skill => 
        desiredSkills.some(yourSkill => 
          skill.toLowerCase().includes(yourSkill.toLowerCase())
        )
      );
      
      // Both conditions must be true for a good match
      return userWantsYourSkills && userOffersWhatYouWant;
    });
  };

  const onSubmit: SubmitHandler<SkillMatcherFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setMatchedProfiles([]);
    setHasSearched(true);

    const offeredSkillsArray = data.offeredSkills.split(",").map(s => s.trim()).filter(s => s.length > 0);
    const desiredSkillsArray = data.desiredSkills.split(",").map(s => s.trim()).filter(s => s.length > 0);

    try {
      // Use our mock data instead of API call
      setTimeout(() => {
        const matches = findMatchingProfiles(offeredSkillsArray, desiredSkillsArray);
        setMatchedProfiles(matches);
        
        if (matches.length === 0) {
          setError("No specific matches found based on your input. Try broadening your skills.");
        }
        setIsLoading(false);
      }, 1000); // Simulate loading delay
    } catch (e) {
      setError("Failed to find matches. Please try again.");
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Skill Matcher
        </CardTitle>
        <CardDescription>
          Get intelligent barter suggestions based on your skills. Enter skills separated by commas.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="offeredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills You Offer</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Web Development, Graphic Design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills You Desire</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Marketing, Content Writing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userProfileDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optional: About You / Your Project (for better matches)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., I'm building a new SaaS product and need help with branding." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </>
              ) : (
                "Get Suggestions"
              )}
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardFooter>
        </form>
      </Form>

      {hasSearched && (
        <div className="mt-6 p-6 border-t">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-muted-foreground">Finding your perfect skill matches...</p>
            </div>
          ) : matchedProfiles.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold mb-4">Match Suggestions: ({matchedProfiles.length} found)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedProfiles.map((profile) => (
                  <Card key={profile.id} className="bg-background/50 hover:bg-background/70 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{profile.name}</CardTitle>
                            <CardDescription className="text-xs">{profile.location}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{profile.bio}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium mb-1">Skills They Offer:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {profile.skillsOffered.map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-primary/5 text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium mb-1">Skills They Want:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {profile.skillsWanted.map((skill, i) => (
                              <Badge key={i} variant="outline" className="bg-accent/5 text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedProfile(profile);
                          setIsProfileModalOpen(true);
                        }}
                      >
                        <UserCircle2 className="mr-1.5 h-3.5 w-3.5" />
                        View Profile
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary"
                        onClick={() => router.push(`/messaging?userId=${profile.id}`)}
                      >
                        <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                        Message
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">No Matches Found</h3>
              <p className="text-muted-foreground">Try broadening your skills or adjusting your criteria</p>
            </div>
          )}
        </div>
      )}
      
      {/* Profile Modal */}
      <ProfileModal 
        profile={selectedProfile} 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
      />
    </Card>
  );
}
