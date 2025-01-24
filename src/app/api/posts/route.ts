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

async function createPost(title: string, content: string) {
    console.log(content);
    try {
        const { rows } = await sql`
            INSERT INTO posts (title, user_id, post_type, created_at)
            VALUES (${title}, 2, 'article', NOW())
            RETURNING *
        `;

        const post: Post = {
            id: rows[0].id,
            title: rows[0].title,
            created_at: rows[0].created_at,
            post_type: rows[0].post_type,
        };
        return post;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function POST(request: Request) {
    try {
        const { title, content } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        const post = await createPost(title, content);
        return NextResponse.json({ data: post });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
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
