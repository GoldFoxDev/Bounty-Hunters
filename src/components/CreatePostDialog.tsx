"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CreatePostDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                setOpen(false);
                setTitle("");
                setContent("");
                // You might want to add a toast notification here
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="fixed bottom-4 right-4 h-14 w-14 rounded-full p-0"
                    size="icon"
                >
                    <Plus className="h-10 w-10 font-bold text-xl" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                        Create a new post to share with the community.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input
                        placeholder="Post title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Write your post content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Create Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
