"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import { toast } from "sonner";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [eventId, setEventId] = useState<string | null>(null);

    useEffect(() => {
        // Capture the error in Sentry and store the eventId
        const eventId = Sentry.captureException(error);
        setEventId(eventId);
        console.error("Page Error:", error);
    }, [error]);

    const handleSubmitFeedback = async () => {
        try {
            if (!eventId) {
                throw new Error("Sentry ID not found");
            }

            console.log("submitting feedback!");
            // Submit user feedback to Sentry
            Sentry.captureFeedback({
                name: "Anonymous User",
                email: "anonymous@example.com",
                message: feedback,
            });
            console.log("submitting feedback!");
            // Submit user feedback to Sentry

            toast.info("Navigating...", {
                description: `Moving to Report Confirmation page`,
                duration: 2000,
            });
            router.push("/error-report-submitted");
        } catch (e) {
            console.error("Failed to submit feedback:", e);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px] w-full">
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-muted-foreground">
                {error.message || "An unexpected error occurred"}
            </p>

            {!showFeedback ? (
                <div className="flex gap-4">
                    <Button onClick={() => reset()}>Try again</Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowFeedback(true)}
                    >
                        Report this issue
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 w-full max-w-md">
                    <textarea
                        className="w-full p-2 border rounded-md min-h-[100px] text-black"
                        placeholder="What were you trying to do when this error occurred?"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <Button onClick={handleSubmitFeedback}>
                            Submit feedback
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowFeedback(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
