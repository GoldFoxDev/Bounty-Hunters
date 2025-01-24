"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, HelpCircle, ChefHat } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { TestStateButton } from "@/components/TestStateButton";
import { Search } from "@/components/Search";
import { Post } from "@/app/api/posts/route";

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/posts");
                if (!response.ok) {
                    console.error(
                        "Failed to fetch posts:",
                        response.statusText
                    );
                    setData(null);
                    return;
                }
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setData(null);
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
                <Suspense fallback={<div>Loading..</div>}>
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
            <form></form>
        </div>
    );
}
