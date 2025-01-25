import { sql } from "@vercel/postgres";
import { Post } from "../route";
import { NextResponse } from "next/server";

async function fetchPost(id: number) {
    try {
        const { rows } = await sql`SELECT * from posts WHERE id = ${id}`;
        console.log("rows:", rows);
        const post: Post = rows.map((row) => ({
            id: row.id,
            title: row.title,
            created_at: row.created_at,
            post_type: row.post_type,
        }))?.[0];
        console.log("post:", post);
        return post;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function GET(request: Request) {
    console.log("get request received");
    // Make sure the function is named GET
    try {
        console.log("request:", request);
        const data = await fetchPost(1);
        console.log("data:", data);
        return NextResponse.json({ data }); // Return with NextResponse
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to get posts" },
            { status: 500 }
        );
    }
}
