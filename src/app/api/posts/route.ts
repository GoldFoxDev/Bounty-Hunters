// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching
// Force static rendering and cache the data of a layout or page by forcing cookies, headers() and useSearchParams() to return empty values.
// export const dynamic = "force-static";

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export type Post = {
    id: number;
    title: string;
    created_at: Date;
    post_type: string;
};

const userPromiseCache = new Map<string, Promise<Post[]>>();

async function fetchPosts() {
    console.log("fetchPosts");
    const userPromise = userPromiseCache.get("posts") ?? fetchPostsImpl();
    console.log("userPromise?", userPromise);
    userPromiseCache.set("posts", userPromise);
    return userPromise;
}

async function fetchPostsImpl() {
    try {
        const { rows } = await sql`SELECT * from posts`;
        console.log("rows:", rows);
        const posts: Post[] = rows.map((row) => ({
            id: row.id,
            title: row.title,
            created_at: row.created_at,
            post_type: row.post_type,
        }));
        return posts;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function GET(request: Request) {
    // Make sure the function is named GET
    try {
        console.log("request:", request);
        const data = await fetchPosts();
        return NextResponse.json({ data }); // Return with NextResponse
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to get posts" },
            { status: 500 }
        );
    }
}
