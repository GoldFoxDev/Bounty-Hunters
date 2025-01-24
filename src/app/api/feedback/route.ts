import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error, userFeedback, url, timestamp } = body;

    // Create a new Sentry event
    const eventId = Sentry.captureException(new Error(error.message), {
      extra: {
        errorDigest: error.digest,
        errorStack: error.stack,
        userFeedback,
        url,
        timestamp,
      },
    });

    // Add user feedback to the Sentry event
    Sentry.captureUserFeedback({
      event_id: eventId,
      comments: userFeedback,
      name: "Anonymous User", // You can add user information if available
      email: "anonymous@example.com", // You can add user information if available
    });

    return NextResponse.json({ success: true, eventId });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
