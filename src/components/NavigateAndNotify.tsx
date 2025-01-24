"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    displayText: string;
    duration?: number;
    notificationMessage: string;
    path: string;
}

export default function NavigateAndNotify({
    displayText,
    duration = 1500,
    notificationMessage,
    path,
}: Props) {
    const router = useRouter();
    const handleHomepageRedirect = async () => {
        toast.info("Navigating...", {
            description: notificationMessage,
            duration: duration,
        });
        router.push(path);
    };
    return (
        <Button
            onClick={handleHomepageRedirect}
            variant="link"
            className="text-primary hover:underline p-0"
        >
            {displayText}
        </Button>
    );
}
