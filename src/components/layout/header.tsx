"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import { NavLinks } from "./sidebar-nav";
import { Input } from "@/components/ui/input";
import { GlobalSearch } from "@/components/search/global-search";

export function AppHeader() {
  const { isMobile } = useSidebar();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-sidebar-border card-gradient backdrop-blur-sm px-4 md:px-6">
      {isMobile ? (
         <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden btn-glow">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="card-gradient backdrop-blur-md flex flex-col p-0">
              <Link
                href="/"
                className="flex items-center gap-2 border-b border-sidebar-border px-4 py-4 text-lg font-varela-round"
              >
                <div className="h-8 w-8 relative overflow-hidden">
                  <Briefcase className="h-7 w-7 text-accent absolute z-10" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm animate-glow-pulse"></div>
                </div>
                <span>{siteConfig.name}</span>
              </Link>
              <nav className="grid gap-2 text-lg font-medium p-4">
                <NavLinks navItems={siteConfig.mainNav} isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
      ) : (
        <SidebarTrigger className="hidden md:flex" data-w-id="sidebar-trigger" />
      )}

      <div className="flex-1"></div>

      <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4">
        {/* Search bar */}
        <div className="hidden md:flex relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input 
            type="search" 
            placeholder="Search users, skills, messages..." 
            className="pl-10 bg-secondary/50 border-sidebar-border w-[220px] lg:w-[280px]" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsSearchOpen(true);
              }
            }}
            onClick={() => setIsSearchOpen(true)}
          />
        </div>
        
        {/* Mobile search button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        
        {/* Global search dialog */}
        <GlobalSearch 
          isOpen={isSearchOpen} 
          onOpenChange={setIsSearchOpen} 
          initialQuery={searchQuery} 
        />
      </div>
    </header>
  );
}
