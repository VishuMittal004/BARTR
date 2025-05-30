import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layout/header";
import { AppFooter } from "@/components/layout/footer";
import { NavLinks } from "@/components/layout/sidebar-nav";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  weight: ["400"],
  variable: "--font-varela-round",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/swap3.png',
    apple: '/swap3.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="u-bg-dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
          varelaRound.variable
        )}
        data-wf-status="1"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={true} variant="inset" collapsible="icon">
            <Sidebar className="border-r card-gradient">
              <SidebarHeader className="p-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <div className="h-8 w-8 relative overflow-hidden">
                    <img 
                      src="/swap3.png" 
                      alt="BARTR Logo" 
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <span className="text-lg font-varela-round group-data-[collapsible=icon]:hidden flex flex-col">
                    <span>BARTR</span>
                    {/* <span className="text-xs text-primary/80">Swap Your Skills</span> */}
                  </span>
                </Link>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu className="px-2">
                  <NavLinks navItems={siteConfig.mainNav} />
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="p-4 border-t border-sidebar-border">
                <div className="flex items-center">
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent btn-glow"
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden text-sm">Profile</span>
                  </Link>
                </div>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset className="flex flex-col">
              <AppHeader />
              <div className="flex flex-col min-h-screen">
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
                  <div className="fade-up show" data-w-id="main-content">
                    {children}
                  </div>
                </main>
                <AppFooter />
              </div>
            </SidebarInset>
          </SidebarProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
