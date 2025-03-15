"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, HelpCircle, ChefHat } from "lucide-react";
import { TestStateButton } from "@/components/TestStateButton";
import { Search } from "@/components/Search";
import { Post } from "@/app/api/posts/route";
import { ErrorMessage } from "@/components/ErrorMessage";

import { useFetch } from "@/hooks/useFetch";
import { QuestionSkeleton } from "./question/[id]/components/QuestionSkeleton";

const IconClasses = "w-4 h-4";

const typeIconMap = [
    {
        type: "article",
        icon: <Newspaper className={IconClasses} />,
    },
    {
        type: "question",
        icon: <HelpCircle className={IconClasses} />,
    },
    {
        type: "recipe",
        icon: <ChefHat className={IconClasses} />,
    },
];

function SkeletonTrending() {
    return Array.from(Array(6).keys()).map((id) => (
        <QuestionSkeleton key={id} />
    ));
}

interface TrendingProps {
    data: Post[] | null;
}

function Trending({ data }: TrendingProps) {
    if (!data) {
        return <ErrorMessage message="No posts found" />;
    }
    return data.map((entity) => (
        <Link href={`/${entity.post_type}/${entity.id}`} key={entity.id}>
            <Card className="hover:border-border-hover">
                <CardHeader>
                    <CardTitle className="flex gap-2 items-start h-16">
                        {
                            typeIconMap.find(
                                (assoc) => assoc.type === entity.post_type
                            )?.icon
                        }
                        {entity.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{entity.created_at?.toLocaleString("en-US")}</p>
                </CardContent>
            </Card>
        </Link>
    ));
}

export default function Home() {
    const { data, error, isLoading } = useFetch<Post[]>({
        url: "/api/posts",
        errorMessage: "Failed to fetch posts",
        emptyDataMessage: "No posts found",
    });

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    return (
        <div className="space-y-6 w-full">
            <Search />
            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold">Trending</h1>
                <TestStateButton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {isLoading ? <SkeletonTrending /> : <Trending data={data} />}
            </div>
        </div>
    );
}
