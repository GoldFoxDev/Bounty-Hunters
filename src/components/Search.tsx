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
import { Suspense, useEffect } from "react";
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
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                ))}
        </CommandGroup>
    );
}

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<Post[] | null>(null);

    return (
        <Command className="rounded-lg border shadow-md transition-[height] duration-200 h-fit">
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
    );
}
