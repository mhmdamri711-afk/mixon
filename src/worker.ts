/// <reference types="@cloudflare/workers-types" />

export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
  DB: D1Database;
}

const API_HEADERS = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

const ERROR_HEADERS = {
  "content-type": "application/json",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: status === 200 ? API_HEADERS : ERROR_HEADERS,
  });
}

async function getRatingStats(
  env: Env,
  userId?: string
): Promise<{
  totalRatings: number;
  totalPoints: number;
  averageRating: number;
  userRating: number | null;
}> {
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
    const userRow = rows.find((row) => row.userId === userId);

    if (userRow) {
      userRating = userRow.rating;
    }
  }

  return {
    totalRatings,
    totalPoints,
    averageRating,
    userRating,
  };
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    // 1. Ratings API
    if (url.pathname === "/api/ratings") {
      // GET current ratings directly from D1
      if (request.method === "GET") {
        const userId = url.searchParams.get("userId") || undefined;

        try {
          const stats = await getRatingStats(env, userId);

          return jsonResponse(stats, 200);
        } catch (dbErr: any) {
          return jsonResponse(
            {
              error: dbErr?.message || "Database error",
            },
            500
          );
        }
      }

      // POST / update rating
      if (request.method === "POST") {
        try {
          const body: any = await request.json().catch(() => ({}));

          const { userId, rating } = body;

          if (
            !userId ||
            typeof userId !== "string" ||
            !userId.trim()
          ) {
            return jsonResponse(
              {
                error: "Missing or invalid client/user identifier.",
              },
              400
            );
          }

          const cleanRating = Number(rating);

          if (
            !Number.isInteger(cleanRating) ||
            cleanRating < 1 ||
            cleanRating > 5
          ) {
            return jsonResponse(
              {
                error: "Rating must be an integer between 1 and 5.",
              },
              400
            );
          }

          const cleanUserId = userId.trim();
          const now = Date.now();

          // Insert new rating or update existing user's rating.
          await env.DB.prepare(
            `INSERT INTO ratings (userId, rating, updatedAt)
             VALUES (?1, ?2, ?3)
             ON CONFLICT(userId)
             DO UPDATE SET rating = ?2, updatedAt = ?3`
          )
            .bind(cleanUserId, cleanRating, now)
            .run();

          // Always calculate the aggregate again directly from D1.
          const stats = await getRatingStats(env, cleanUserId);

          return jsonResponse(stats, 200);
        } catch (dbErr: any) {
          return jsonResponse(
            {
              error: dbErr?.message || "Database error",
            },
            500
          );
        }
      }

      return jsonResponse(
        {
          error: "Method not allowed.",
        },
        405
      );
    }

    // 2. Other API routes
    if (url.pathname.startsWith("/api/")) {
      return jsonResponse(
        {
          status: "ok",
          message: "MIXON API is active",
        },
        200
      );
    }

    // 3. Static assets
    const response = await env.ASSETS.fetch(request);

    // 4. SPA fallback only for routes without file extensions.
    //    JPG, PNG, SVG, CSS, JS, etc. must return their actual files.
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
