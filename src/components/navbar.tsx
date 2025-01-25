"use client";
import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { isSignedIn, isLoaded } = useUser();

    return (
        <nav className="bg-background border-b">
            <div className="container mx-auto px-8 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    BountyBoard
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    {isLoaded ? (
                        <>
                            {isSignedIn && (
                                <Link
                                    href="/dashboard"
                                    className="hover:underline"
                                >
                                    Dashboard
                                </Link>
                            )}
                            {isSignedIn ? (
                                <UserButton afterSignOutUrl="/" />
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <Button variant="outline">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button>Sign Up</Button>
                                    </SignUpButton>
                                </>
                            )}
                        </>
                    ) : (
                        // Loading skeleton
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-9 bg-muted animate-pulse rounded-md" />
                            <div className="w-9 h-9 bg-muted animate-pulse rounded-full" />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
