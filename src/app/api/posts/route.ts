// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching
// Force static rendering and cache the data of a layout or page by forcing cookies, headers() and useSearchParams() to return empty values.
export const dynamic = "force-static";

import { sql } from "@vercel/postgres";

export type Post = {
    id: number;
    title: string;
    created_at: Date;
    post_type: string;
};

const userPromiseCache = new Map<string, Promise<Post[]>>();

export async function fetchPosts() {
    const userPromise = userPromiseCache.get("posts") ?? fetchPostsImpl();
    userPromiseCache.set("posts", userPromise);
    return userPromise;
}

async function fetchPostsImpl() {
    const { rows } = await sql`SELECT * from posts`;
    console.log("rows:", rows);
    const posts: Post[] = rows.map((row) => ({
        id: row.id,
        title: row.title,
        created_at: row.created_at,
        post_type: row.post_type,
    }));
    return posts;
}

export async function GET() {
    const data = await fetchPostsImpl();
    return Response.json({ data });
}
