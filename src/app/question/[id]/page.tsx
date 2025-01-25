import { Suspense } from "react";
import Question from "./Question";

interface ResolvedParams {
    id: string;
}

interface PageProps {
    params: Promise<ResolvedParams>;
}

export default async function RecipePage({ params }: PageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    return (
        <main className="w-full">
            <Suspense fallback={<div>Loading...</div>}>
                <Question id={id} />
            </Suspense>
        </main>
    );
}
