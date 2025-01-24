"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, HelpCircle, ChefHat } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { TestStateButton } from "@/components/TestStateButton";
import { Search } from "@/components/Search";
import { Post } from "@/app/api/posts/route";
import { CreatePostDialog } from "@/components/CreatePostDialog";

import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
}

const IconClasses = "w-4 h-4";

const typeIconMap = [
    {
        type: "Article",
        icon: <Newspaper className={IconClasses} />,
    },
    {
        type: "Question",
        icon: <HelpCircle className={IconClasses} />,
    },
    {
        type: "Recipe",
        icon: <ChefHat className={IconClasses} />,
    },
];

export default function Home() {
    const [data, setData] = useState<Post[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    if (error) throw error; // This will trigger the error boundary

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/posts");
                if (!response.ok) {
                    setError(new Error("Failed to fetch posts"));
                    return;
                }
                const result = await response.json();
                if (!result.data || result.data.length === 0) {
                    setError(new Error("No posts found"));
                    return;
                }
                setData(result.data);
            } catch (error) {
                setError(error as Error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6 w-full">
            <Search />
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold">Trending</h1>
                <TestStateButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Suspense
                    fallback={
                        <div>
                            {Array.from(Array(10).keys()).map((id) => (
                                <SkeletonCard key={id} />
                            ))}
                        </div>
                    }
                >
                    {data &&
                        data.map((entity) => (
                            <Link href={`/entity/${entity.id}`} key={entity.id}>
                                <Card className="hover:border-border-hover">
                                    <CardHeader>
                                        <CardTitle className="flex gap-2 items-start h-16">
                                            {
                                                typeIconMap.find(
                                                    (assoc) =>
                                                        assoc.type ===
                                                        entity.post_type
                                                )?.icon
                                            }
                                            {entity.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            {entity.created_at?.toLocaleString(
                                                "en-US"
                                            )}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                </Suspense>
            </div>
            <CreatePostDialog />
        </div>
    );
}
