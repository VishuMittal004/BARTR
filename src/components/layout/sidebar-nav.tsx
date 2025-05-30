"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, User, Search, MessageSquare, Bell, LayoutDashboard, type LucideIcon } from "lucide-react";

// Icon map to render icons dynamically based on string names
const iconMap: { [key: string]: LucideIcon } = {
  LayoutDashboard,
  User,
  Search,
  MessageSquare,
  Bell,
  Home,
};

interface NavLinksProps {
  navItems: NavItem[];
  isMobile?: boolean;
}

export function NavLinks({ navItems, isMobile = false }: NavLinksProps) {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar(); // Use useSidebar only if not mobile for tooltip logic

  return (
    <TooltipProvider delayDuration={0}>
      <div className="space-y-2" data-w-id="nav-links">
        {navItems.map((item, index) => {
          const IconComponent = item.iconName ? iconMap[item.iconName] : null;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          // Add a slight delay to each item's appearance
          const animationDelay = `${index * 0.05}s`;

          // Mobile link content
          const mobileLinkContent = (
            <>
              <div className="relative flex items-center justify-center">
                {IconComponent && (
                  <>
                    <IconComponent className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
                    {isActive && <div className="absolute inset-0 bg-accent/10 rounded-full animate-glow-pulse -z-10"></div>}
                  </>
                )}
              </div>
              <span className="text-sm">{item.title}</span>
            </>
          );

          // Desktop link content
          const desktopLinkContent = (
            <>
              <div className="relative flex items-center justify-center">
                {IconComponent && (
                  <>
                    <IconComponent className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-white'}`} />
                    {isActive && <div className="absolute inset-0 bg-accent/10 rounded-full animate-glow-pulse -z-10"></div>}
                  </>
                )}
              </div>
              <span 
                className={cn(
                  "ml-2 transition-all duration-300", 
                  isMobile || sidebarState === "expanded" ? "inline" : "sr-only",
                  isActive ? "text-accent font-medium" : "text-muted-foreground group-hover:text-white"
                )}
              >
                {item.title}
              </span>
            </>
          );

          if (isMobile) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 transition-all nav-link-hover",
                  isActive ? "text-accent" : "text-muted-foreground"
                )}
                style={{ transitionDelay: animationDelay }}
                data-w-id={`nav-item-${index}`}
              >
                {mobileLinkContent}
              </Link>
            );
          }
          
          return (
            <SidebarMenuItem 
              key={item.href} 
              className="w-full fade-up show" 
              style={{ transitionDelay: animationDelay }}
              data-w-id={`nav-item-${index}`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start group transition-all duration-300 btn-glow",
                        isActive ? "bg-sidebar-accent/30" : "hover:bg-sidebar-accent/20"
                      )}
                    >
                      {desktopLinkContent}
                    </SidebarMenuButton>
                  </Link>
                </TooltipTrigger>
                {sidebarState === "collapsed" && (
                  <TooltipContent side="right" align="center" className="card-gradient backdrop-blur-sm">
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
