import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
    const resolvedParams = await params;
    const article = [
        {
            id: 1,
            name: "Article 1",
            posted: "Posted on January 1, 2023",
            type: "Article",
        },
    ].find((m) => m.id === parseInt(resolvedParams.id) && m.type === "Article");

    if (!article) {
        notFound();
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{article.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{article.posted}</p>
                <div className="prose max-w-none">
                    <p>Article content goes here</p>
                </div>
            </CardContent>
        </Card>
    );
}
