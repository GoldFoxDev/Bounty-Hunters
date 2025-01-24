"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function TestStateButton() {
    const [count, setCount] = useState(0);

    const updateState = () => {
        toast.info("State updated!", {
            description:
                "Check performance measures, such as function caching now : )",
            duration: 4000,
        });
        setCount((count) => count + 1);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => updateState()}>
                        Test: Update State ({count})
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Great way to check performance measures -- such as function
                    caching
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
