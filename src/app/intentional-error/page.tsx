"use client";
import { useEffect, useState } from "react";

export default function Page() {
    const [error, setError] = useState<Error | null>(null);

    if (error) throw error; // This will trigger the error boundary

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/intentional-error");
                if (!response.ok) {
                    setError(new Error("Failed to fetch posts"));
                    return;
                }
                const result = await response.json();
                if (!result.data || result.data.length === 0) {
                    setError(new Error("No posts found"));
                    return;
                }
            } catch (error) {
                setError(error as Error);
            }
        };

        fetchData();
    }, []);

    return <div>This page triggers an intentional error</div>;
}
