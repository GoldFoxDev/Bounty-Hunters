import NavigateAndNotify from "@/components/NavigateAndNotify";

export default function ErrorReportSubmitted() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-4">
            <h1 className="text-2xl font-semibold">Thank You!</h1>
            <p className="text-center text-muted-foreground max-w-md">
                Your error report has been successfully submitted. We appreciate
                your help in improving our service.
            </p>
            <p className="text-sm text-muted-foreground">
                You can now safely return to the{" "}
                <NavigateAndNotify
                    displayText="homepage"
                    notificationMessage="Moving to Home"
                    path="/"
                />
                .
            </p>
        </div>
    );
}
