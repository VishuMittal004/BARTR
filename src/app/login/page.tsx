"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Sparkles, Lock, User, Phone, CheckCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

// Country codes for dropdown
const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+65", country: "Singapore" },
  { code: "+971", country: "UAE" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginCountryCode, setLoginCountryCode] = useState("+91");
  const [signupCountryCode, setSignupCountryCode] = useState("+91");
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showSignupDropdown, setShowSignupDropdown] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get phone number and add country code
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const fullPhoneNumber = `${loginCountryCode}${phoneInput.value}`;
    
    console.log('Login with phone number:', fullPhoneNumber);
    
    // Simulate login delay (reduced to 800ms for better responsiveness)
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: "Login successful!",
        description: "Welcome back to BARTR!",
        variant: "default",
      });
      
      // Redirect to dashboard
      router.push('/');
    }, 800);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get phone number and add country code
    const phoneInput = document.getElementById('signup-phone') as HTMLInputElement;
    const fullPhoneNumber = `${signupCountryCode}${phoneInput.value}`;
    
    console.log('Signup with phone number:', fullPhoneNumber);
    
    // Simulate signup delay (reduced to 800ms for better responsiveness)
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success dialog
      setShowSuccessDialog(true);
    }, 800);
  };
  
  // Tab state for login/signup
  const [activeTab, setActiveTab] = useState("login");
  
  // Handle success dialog close and redirect to login
  const handleSuccessDialogClose = () => {
    setShowSuccessDialog(false);
    // Switch to login tab
    setActiveTab("login");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-16">
              <Image
                src="/swap3.png"
                alt="BARTR Logo"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 bg-accent/10 rounded-full blur-lg -z-10 animate-glow-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-varela-round text-accent mb-2">Welcome to BARTR</h1>
          <h2 className="text-xl font-varela-round text-primary mb-2">Swap Your Skills</h2>
          <p className="text-muted-foreground">Exchange skills with our vibrant community</p>
        </div>
        
        <Card className="card-gradient backdrop-blur-sm border-sidebar-border overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle className="text-xl font-varela-round flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Sign In
                  </CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md border-input bg-muted h-10 min-w-[56px]">
                        <span className="text-muted-foreground">+91</span>
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          placeholder="10-digit mobile number" 
                          type="tel" 
                          pattern="[0-9]{10}" 
                          maxLength={10}
                          className="pl-10 rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter a valid 10-digit Indian mobile number
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link 
                        href="#" 
                        className="text-xs text-accent hover:text-accent/80 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <div className="pl-10">
                        <PasswordInput 
                          id="password" 
                          className="w-full"
                          placeholder="Your password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full btn-glow" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-r-transparent animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <CardHeader>
                  <CardTitle className="text-xl font-varela-round flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    Create Account
                  </CardTitle>
                  <CardDescription>
                    Join the BARTR community to start exchanging skills
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="fullname" 
                        placeholder="Rajesh Kumar" 
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative flex">
                      <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md border-input bg-muted h-10 min-w-[56px]">
                        <span className="text-muted-foreground">+91</span>
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="signup-phone" 
                          placeholder="10-digit mobile number" 
                          type="tel" 
                          pattern="[0-9]{10}" 
                          maxLength={10}
                          className="pl-10 rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter a valid 10-digit Indian mobile number
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                      <div className="pl-10">
                        <PasswordInput 
                          id="signup-password" 
                          className="w-full"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full btn-glow" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-r-transparent animate-spin"></div>
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>By continuing, you agree to BARTR's <Link href="#" className="text-accent hover:underline">Terms of Service</Link> and <Link href="#" className="text-accent hover:underline">Privacy Policy</Link></p>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-accent">
              <CheckCircle className="h-5 w-5" />
              Registration Successful!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
              <p className="mb-2">Your account has been created successfully.</p>
              <p>You can now login with your credentials to access all features of the BARTR platform.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleSuccessDialogClose}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Continue to Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
