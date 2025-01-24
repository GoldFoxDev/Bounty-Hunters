import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

async function fetchError() {
    try {
        const { rows } = await sql`SELECT * from ananfasdnjkasdajsnd`;
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function GET() {
    // Make sure the function is named GET
    try {
        const data = await fetchError();
        return NextResponse.json({ data }); // Return with NextResponse
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Yea, we were expecting this error" },
            { status: 500 }
        );
    }
}
