"use client";
import { CreditCard, Settings, User } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { Suspense, useEffect, useRef } from "react";
import { useState } from "react";
import { Post } from "@/app/api/posts/route";
import { useRouter } from "next/navigation";

interface Props {
    data: Post[] | null;
    setData: (data: Post[] | null) => void;
}

function PostCommands({ data, setData }: Props) {
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/posts");
            const data = await response.json();
            setData(data.data);
        };

        fetchData();
    }, [setData]);

    const navigateToPost = (postId: number) => {
        console.log("navigating!");
        router.push(`/entity/${postId.toString()}`);
    };

    return (
        <CommandGroup heading="Suggestions">
            {data &&
                data.map((post: Post, id) => (
                    <CommandItem
                        key={id}
                        onSelect={() => {
                            navigateToPost(post.id);
                        }}
                        className="cursor-pointer"
                    >
                        <span>{post.title}</span>
                        <CommandShortcut>⌘{post.id}</CommandShortcut>
                    </CommandItem>
                ))}
        </CommandGroup>
    );
}

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<Post[] | null>(null);
    const commandRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                return;
            } else if (event.metaKey && data) {
                const keyPressed = event.key;
                const post = data.find((p) => p.id.toString() === keyPressed);
                if (post) {
                    router.push(`/entity/${post.id.toString()}`);
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [data, router]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                commandRef.current &&
                !commandRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full">
            <div className="h-12 w-full"></div>
            <div className="absolute top-0 left-0 w-full">
                <Command
                    ref={commandRef}
                    className="rounded-lg border shadow-md transition-[height] duration-200 h-fit"
                >
                    <CommandInput
                        placeholder="Type a command or search..."
                        onFocus={() => setIsOpen(true)}
                    />
                    {isOpen && (
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <Suspense fallback={<></>}>
                                <PostCommands data={data} setData={setData} />
                                <CommandSeparator />
                            </Suspense>
                            <CommandGroup heading="Settings">
                                <CommandItem>
                                    <User />
                                    <span>Profile</span>
                                    <CommandShortcut>⌘P</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <CreditCard />
                                    <span>Billing</span>
                                    <CommandShortcut>⌘B</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <Settings />
                                    <span>Settings</span>
                                    <CommandShortcut>⌘S</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    )}
                </Command>
            </div>
        </div>
    );
}
