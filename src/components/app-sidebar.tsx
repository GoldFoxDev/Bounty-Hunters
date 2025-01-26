"use client";

import * as React from "react";
import { useClerk, useUser } from "@clerk/nextjs";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Bot, Settings2, TerminalSquare } from "lucide-react";

// Add these components before the SignInPrompt
function SidebarSkeleton() {
    return (
        <div className="space-y-4 p-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

function SidebarError() {
    return (
        <div className="flex h-full items-center justify-center p-4 text-center">
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    Failed to load sidebar content
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-sm underline"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}

function SignInPrompt() {
    return (
        <div className="flex h-full items-center justify-between gap-4 p-4 text-center">
            <SignInButton>
                <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignInButton>
                <Button variant="outline">Sign Up</Button>
            </SignInButton>
        </div>
    );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const [isNavigationReady, setIsNavigationReady] = React.useState(false);

    const navigationData = {
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: TerminalSquare,
                isActive: true,
            },
            {
                title: "Bounties",
                url: "/bounties",
                icon: Bot,
            },
            {
                title: "Documentation",
                url: "/docs",
                icon: BookOpen,
            },
            {
                title: "Settings",
                url: "/settings",
                icon: Settings2,
                items: [
                    {
                        title: "Profile",
                        url: "/settings/profile",
                    },
                    {
                        title: "Account",
                        url: "/settings/account",
                    },
                ],
            },
        ],
        projects: [], // Empty projects array as requested
    };

    React.useEffect(() => {
        const timer = setTimeout(() => setIsNavigationReady(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!isLoaded || !isNavigationReady) {
        return (
            <Sidebar collapsible="icon" {...props}>
                <SidebarSkeleton />
            </Sidebar>
        );
    }

    const userData = user
        ? {
              name: user.fullName || user.username || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "",
              avatar: user.imageUrl,
              onSignOut: () => signOut(),
          }
        : undefined;

    return (
        <ErrorBoundary fallback={<SidebarError />}>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <div className="grid flex-1 text-left text-sm leading-tight p-2">
                        <span className="font-semibold">Bounty Board</span>
                        <span className="truncate text-xs">Basic</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={navigationData.navMain} />
                    {navigationData.projects?.length > 0 && (
                        <NavProjects projects={navigationData.projects} />
                    )}
                </SidebarContent>
                <SidebarFooter>
                    {isSignedIn ? (
                        <>{userData && <NavUser user={userData} />}</>
                    ) : (
                        <SignInPrompt />
                    )}
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </ErrorBoundary>
    );
}
