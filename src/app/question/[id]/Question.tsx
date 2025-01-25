"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/app/api/posts/route";
import { useFetch } from "@/hooks/useFetch";
import { formatDate } from "@/utils/dateUtils";
import { QuestionContent } from "./components/QuestionContent";
import { QuestionSkeleton } from "./components/QuestionSkeleton";
import { ErrorMessage } from "@/components/ErrorMessage";

interface Props {
    id: string;
}

export default function Question({ id }: Props) {
    const { data, error, isLoading } = useFetch<Post>({
        url: `/api/posts/${id}`,
        errorMessage: "Failed to fetch Question",
        emptyDataMessage: "Question not found",
    });

    if (isLoading) {
        return <QuestionSkeleton />;
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    if (!data) {
        return <ErrorMessage message="Question not found" />;
    }

    return (
        <article>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <time
                        className="mb-4 text-sm text-gray-500"
                        dateTime={new Date(data.created_at).toISOString()}
                    >
                        {formatDate(new Date(data.created_at))}
                    </time>
                    <QuestionContent content={"Temporary content"} />
                </CardContent>
            </Card>
        </article>
    );
}
