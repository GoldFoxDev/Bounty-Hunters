## Project Purpose

Receiving and providing help online has a few common issues:

1. People asking the same question multiple times
2. Effort:Return ratio has a massive deficit when comparing requesting vs. providing assistance.

Here's how I propose this can be fixed:

1. This can be saved by changing how we structure requesting for help; Instead of having search + posting questions separate, let's combine them. When you need help, you describe your issue. This will search for other posted issues and list potentially similar issues. If there are none, you are able to post an issue at a cost.
2. Everyone new gets some currency to start out with, and the only way to gain new currency is to answer questions.

## Details and Thought Rationale

We can make the process of requesting and receiving information a bit more fun, as well. I think a good way of accomplishing this is by making providing and requesting assistance more fun.

The way I aim to make both directions of this assistance exchange more fun is by gamifying it. It's a tried and true measure that has seen success across multiple industries.

The theme here is important, and since the target demographic will predominantly be software engineering, with its pre-existing culture of "bug bounties", I think the theme "Bounty Hunters" will feel familiar but not overdone.

## Terminology

-   **Bounty**: The amount of currency a user is able to spend on a question.
-   **Question**: A user's request for help.
-   **Answer**: A user's response to a question. This can be a standard Response, or an Article.
-   **Response**: A collection of Blocks.
-   **Block**: Contains text, Type, and a position.
-   **Type**: Can be any specific string-value, fitting whatever I have set in the database, such as: `Anchor`, `Header1`, `Paragraph`, etc.
-   `**Article**: A superset of a Response which is SEO-indexed. Requires a certain level of credibility from the poster before being accesible by the poster. Everyone can view existing articles, though.

## What Currently Exists

-   Query caching w/ Next + React
-   Authentication w/ Clerk
-   Query logging and error reporting w/ Sentry
-   Consistent theme w/ Shadcn + Tailwind
-   Database w/ Vercel's Postgres (Neon)
-   Analytics w/ Vercel

## Sucess Migration Considerations

If this is to ever become a serious project that supports a very large nunber of active users, then I'd want to make a few changes:

-   Analytics -> Posthog
-   Backend -> Laravel Inertia
-   Authentication -> Laravel Inertia

With future migration possibilities in mind, I will be trying to keep the codebase as small and simple as possible and focusing on quality features over a quantity of features.

## Roadmap

### Foundation (2 Weeks)

The two-week plan is predominantly foundation.

### Short-Term (1 Month)

### Long-Term

Suggest ranges for question bounties with reasonable minimums as per what's normally answered in the desired frequency and quality.

We want to regulate answers by encouraging higher bounties for higher quality answers. For easier questions lower bounties are reasonable, but at this point, it's more likely they'll be able to find the answer to their question via historical answers. Another non-trivial consideration would be package, system, and product versions and their impact on question relevance.

Add motions, animations, and more. Interacting with this project should feel immersive. I'd likely use [Motion](https://examples.motion.dev/js/html-content)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Funding

Vercel will cover the bill for awhile. I don't expect this to blow up anyways
