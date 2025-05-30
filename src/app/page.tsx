import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillMatcher } from "@/components/ai/skill-matcher";
import { CourseRecommendations } from "@/components/courses/course-recommendations";
import { Activity, IndianRupee, Users, Zap, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-varela-round mb-2 text-accent">
          <span className="relative inline-block">
            Hi Buddy,
            <span className="absolute -bottom-1 left-0 h-1 w-1/2 bg-accent/30 rounded-full"></span>
          </span>
        </h1>
        <p className="text-muted-foreground">Your activity at a glance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-gradient backdrop-blur-sm border-sidebar-border overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Barters</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10">
              <IndianRupee className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-varela-round">5</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-accent">+2</span> since last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient backdrop-blur-sm border-sidebar-border overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Matches</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-accent/10">
              <Users className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-varela-round">12</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-accent">+3</span> today
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient backdrop-blur-sm border-sidebar-border overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-radial from-chart-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Offered</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-chart-1/10">
              <Zap className="h-4 w-4 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-varela-round">8</div>
            <p className="text-xs text-muted-foreground">Showcasing your talents</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient backdrop-blur-sm border-sidebar-border overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-radial from-chart-3/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-chart-3/10">
              <Activity className="h-4 w-4 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-varela-round">3</div>
            <p className="text-xs text-muted-foreground">Awaiting your response</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="card-gradient backdrop-blur-sm border-sidebar-border h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-varela-round text-primary flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Skill Matcher
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-xs btn-glow">
                  View History
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <CardDescription>Find the perfect match for your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillMatcher />
            </CardContent>
          </Card>
        </div>
        
        <Card className="lg:col-span-1 flex flex-col p-0 overflow-hidden card-gradient backdrop-blur-sm border-sidebar-border">
          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute inset-0 z-10">
              <Image 
                src="/br.png" 
                alt="Background pattern" 
                fill 
                style={{ objectFit: "cover" }} 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card opacity-90"></div>
            </div>
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Barter illustration"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 hover:scale-105"
              data-ai-hint="collaboration teamwork"
            />
          </div>
          <CardHeader className="text-center relative z-20 -mt-8">
            <CardTitle className="text-2xl font-varela-round">Welcome to BARTR!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Exchange skills with our vibrant community
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-sm text-center text-muted-foreground mb-6">
              Find your perfect collaboration using our matching system.
            </p>
            <Link href="/login">
              <Button className="btn-glow relative overflow-hidden group mb-6">
                <span className="relative z-10">Browse Profiles</span>
                <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </Button>
            </Link>
            
            <div className="w-full border-t border-border/30 my-2 pt-4">
              <p className="text-sm text-center text-muted-foreground mb-4">
                Take BARTR on the go! Download our mobile app
              </p>
              <div className="flex flex-row gap-3 justify-center">
                <a href="https://drive.usercontent.google.com/download?id=1vKohbrJ8K32AO5NNHomSIKzlOSO1VDC6&export=download&authuser=0" className="inline-block">
                  <Button variant="outline" className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20 relative group overflow-hidden transition-all duration-300">
                    <span className="relative z-10 group-hover:text-teal-400 transition-colors duration-300 group-hover:font-medium flex items-center justify-center">                    
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone group-hover:stroke-teal-400 transition-all duration-300 mr-2">
                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                        <path d="M12 18h.01"/>
                      </svg>
                      Android App
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/30 to-teal-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></span>
                  </Button>
                </a>
                <a href="https://drive.usercontent.google.com/download?id=1vKohbrJ8K32AO5NNHomSIKzlOSO1VDC6&export=download&authuser=0" className="inline-block">
                  <Button variant="outline" className="w-full bg-accent/10 hover:bg-accent/20 border-accent/20 relative group overflow-hidden transition-all duration-300">
                    <span className="relative z-10 group-hover:text-teal-400 transition-colors duration-300 group-hover:font-medium flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-apple group-hover:stroke-teal-400 transition-all duration-300 mr-2">
                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
                        <path d="M10 2c1 .5 2 2 2 5"/>
                      </svg>
                      iOS App
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/30 to-teal-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></span>
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="card-gradient backdrop-blur-sm border-sidebar-border h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-varela-round text-primary flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                Recommended Courses
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs btn-glow">
                All Courses
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            <CardDescription>Enhance your skills with these curated courses</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseRecommendations />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
