import NavigateAndNotify from "@/components/NavigateAndNotify";

export default function NotFound() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-[80vh] w-full">
            <div className="flex flex-col gap-1 items-center">
                <h2>404 - Page Not Found</h2>
                <p className="text-center text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>
            </div>
            <NavigateAndNotify
                displayText="homepage"
                notificationMessage="Moving to Home"
                path="/"
            />
        </div>
    );
}
