import type { LucideIcon } from "lucide-react";
import { Home, User, Search, MessageSquare, Bell, LayoutDashboard } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  iconName?: keyof typeof iconMap; // Changed from LucideIcon to string key
  disabled?: boolean;
  external?: boolean;
};

// Define a map for icon components. This map will be used in NavLinks.
// We are defining it here to ensure NavItem.iconName is type-safe.
// This specific map won't be directly used by this file but helps define the type.
export const iconMap = {
  LayoutDashboard,
  User,
  Search,
  MessageSquare,
  Bell,
  Home,
};

export const siteConfig = {
  name: "BARTR - Swap Your Skills",
  description: "Barter skills and services with ease.",
  mainNav: [
    { title: "Dashboard", href: "/", iconName: "LayoutDashboard" },
    { title: "Login", href: "/login", iconName: "User" },
    { title: "Search Skills", href: "/search", iconName: "Search" },
    { title: "Messages", href: "/messaging", iconName: "MessageSquare" },
    { title: "Barter Requests", href: "/requests", iconName: "Bell" },
  ] as NavItem[],
};
