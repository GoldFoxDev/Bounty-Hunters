export default function ErrorReportSubmittedLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-4">
            <h1 className="text-2xl font-semibold animate-pulse">
                Processing...
            </h1>
            <p className="text-center text-muted-foreground max-w-md animate-pulse">
                Please wait while we confirm your submission...
            </p>
        </div>
    );
}
