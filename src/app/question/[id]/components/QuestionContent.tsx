interface RecipeContentProps {
    content: string;
}

export function QuestionContent({ content }: RecipeContentProps) {
    return <div className="prose prose-sm sm:prose lg:prose-lg">{content}</div>;
}
