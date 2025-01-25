import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function QuestionSkeleton() {
    return (
        <Card className="w-full animate-pulse">
            <CardHeader>
                <div className="h-8 w-3/4 bg-gray-200/30 rounded" />
            </CardHeader>
            <CardContent>
                <div className="h-4 w-1/4 bg-gray-200/30 rounded mb-4" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200/30 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200/30 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200/30 rounded" />
                </div>
            </CardContent>
        </Card>
    );
}
