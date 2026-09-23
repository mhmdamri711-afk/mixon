/// <reference types="@cloudflare/workers-types" />

export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // 1. Backend APIs routing support
    if (url.pathname === "/api/ratings") {
      if (request.method === "GET") {
        const userId = url.searchParams.get("userId") || undefined;

        try {
          const { results } = await env.DB
            .prepare("SELECT userId, rating FROM ratings")
            .all<{ userId: string; rating: number }>();

          const rows = results || [];

          const totalRatings = rows.length;
          const totalPoints = rows.reduce((acc, curr) => acc + curr.rating, 0);
          const averageRating =
            totalRatings > 0
              ? Math.round((totalPoints / totalRatings) * 10) / 10
              : 0;

          let userRating: number | null = null;

          if (userId) {
            const userRow = rows.find((r) => r.userId === userId);
            if (userRow) {
              userRating = userRow.rating;
            }
          }

          return new Response(
            JSON.stringify({
              totalRatings,
              totalPoints,
              averageRating,
              userRating,
            }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } catch (dbErr: any) {
          return new Response(
            JSON.stringify({
              error: dbErr.message || "Database error",
            }),
            {
              status: 500,
              headers: {
                "content-type": "application/json",
              },
            }
          );
        }
      }

      if (request.method === "POST") {
        try {
          const body: any = await request.json().catch(() => ({}));
          const { userId, rating } = body;

          if (!userId || typeof userId !== "string" || !userId.trim()) {
            return new Response(
              JSON.stringify({
                error: "Missing or invalid client/user identifier.",
              }),
              {
                status: 400,
                headers: {
                  "content-type": "application/json",
                },
              }
            );
          }

          const cleanRating = Number(rating);

          if (
            !Number.isInteger(cleanRating) ||
            cleanRating < 1 ||
            cleanRating > 5
          ) {
            return new Response(
              JSON.stringify({
                error: "Rating must be an integer between 1 and 5.",
              }),
              {
                status: 400,
                headers: {
                  "content-type": "application/json",
                },
              }
            );
          }

          const cleanUserId = userId.trim();
          const now = Date.now();

          await env.DB.prepare(
            `INSERT INTO ratings (userId, rating, updatedAt)
             VALUES (?1, ?2, ?3)
             ON CONFLICT(userId)
             DO UPDATE SET rating = ?2, updatedAt = ?3`
          )
            .bind(cleanUserId, cleanRating, now)
            .run();

          const { results } = await env.DB
            .prepare("SELECT userId, rating FROM ratings")
            .all<{ userId: string; rating: number }>();

          const rows = results || [];

          const totalRatings = rows.length;
          const totalPoints = rows.reduce((acc, curr) => acc + curr.rating, 0);
          const averageRating =
            totalRatings > 0
              ? Math.round((totalPoints / totalRatings) * 10) / 10
              : 0;

          let userRating: number | null = null;

          const userRow = rows.find((r) => r.userId === cleanUserId);

          if (userRow) {
            userRating = userRow.rating;
          }

          return new Response(
            JSON.stringify({
              totalRatings,
              totalPoints,
              averageRating,
              userRating,
            }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } catch (dbErr: any) {
          return new Response(
            JSON.stringify({
              error: dbErr.message || "Database error",
            }),
            {
              status: 500,
              headers: {
                "content-type": "application/json",
              },
            }
          );
        }
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return new Response(
        JSON.stringify({
          status: "ok",
          message: "MIXON API is active",
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }

    // 2. Fetch the requested static asset
    const response = await env.ASSETS.fetch(request);

    // 3. Only use SPA fallback for routes without a file extension.
    //    Static files such as JPG, PNG, SVG, CSS, JS, etc. must return
    //    their real response instead of being replaced by index.html.
    if (
      response.status === 404 &&
      !url.pathname.split("/").pop()?.includes(".")
    ) {
      const indexRequest = new Request(
        new URL("/index.html", request.url).toString(),
        request
      );

      return env.ASSETS.fetch(indexRequest);
    }

    return response;
  },
};
