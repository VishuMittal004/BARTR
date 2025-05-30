import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto pt-12 pb-6 bg-black border-t border-sidebar-border">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-varela-round text-accent mb-1">BARTR</h3>
            {/* <h4 className="text-sm font-varela-round text-primary mb-3">Swap Your Skills</h4> */}
            <p className="text-muted-foreground mb-4 text-sm">
              India's premier skill exchange platform. Connect with talented professionals and trade skills to grow together.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/20 hover:bg-accent/20 hover:text-accent">
                <Github className="h-4 w-4" />
                <span className="sr-only">Github</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/20 hover:bg-accent/20 hover:text-accent">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/20 hover:bg-accent/20 hover:text-accent">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/20 hover:bg-accent/20 hover:text-accent">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-accent transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-muted-foreground hover:text-accent transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-md font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-accent mr-2 mt-0.5" />
                <span className="text-muted-foreground">
                  1234 Noida, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-accent mr-2" />
                <span className="text-muted-foreground">+91 98764 53210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-accent mr-2" />
                <span className="text-muted-foreground">contact@bartr.in</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-md font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter to get the latest updates.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-muted/20 border-sidebar-border text-sm" 
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-sidebar-border" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} BARTR - Swap Your Skills. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-accent transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
