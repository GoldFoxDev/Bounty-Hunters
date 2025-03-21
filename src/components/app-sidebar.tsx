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
        <div className="flex flex-col justify-between h-full">
            <div className="space-y-4 p-4">
                <Skeleton className="h-10 w-full mb-8" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-between p-4 gap-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
            </div>
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
                <Button
                    variant="outline"
                    className="text-white border-transparent hover:border hover:border-primary/50 hover:bg-transparent"
                >
                    Sign In
                </Button>
            </SignInButton>
            <SignInButton>
                <Button
                    variant="outline"
                    className="border-primary/30 hover:border-primary/50 bg-transparent hover:bg-transparent"
                >
                    Sign Up
                </Button>
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
                    <div className="grid flex-1 text-left gap-2 leading-tight p-2">
                        <span className="font-semibold text-lg">
                            Bounty Board
                        </span>
                        {/* Add user's coins here -- query users tbl by clerk id*/}
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
