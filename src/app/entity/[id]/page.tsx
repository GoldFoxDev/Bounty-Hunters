import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    {
        id: 1,
        name: "Alternative to Nested Subscriptions",
        posted: "2023-05-15",
        type: "Article",
        tags: [
            {
                name: "Angular",
                version: "18.x",
            },
            {
                name: "RxJS",
                version: "7.8.x",
            },
        ],
    },
    {
        id: 2,
        name: "How to Make a Custom Hook?",
        posted: "2023-05-10",
        type: "Question",
        tags: [
            {
                name: "React",
                version: "16.x",
            },
        ],
    },
    {
        id: 3,
        name: "SQL Safe-Mode Update by Non-PK",
        posted: "2023-05-05",
        type: "Recipe",
    },
];

interface PageProps {
    params: Promise<{ id: string }>;
}

// This is a mock data structure. In a real application, you'd fetch this from a database.
export default async function EntityPage({ params }: PageProps) {
    const resolvedParams = await params;
    const entity = data.find((m) => m.id === parseInt(resolvedParams.id));

    if (!entity) {
        notFound();
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{entity.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">{entity.posted}</p>
                <p>Some description</p>
            </CardContent>
        </Card>
    );
}
