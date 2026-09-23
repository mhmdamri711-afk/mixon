/// <reference types="@cloudflare/workers-types" />

export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // 1. Backend APIs routing support (for future expansion)
    if (url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ status: "ok", message: "MIXON API is active" }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }

    // 2. Fetch the asset using the ASSETS binding
    let response = await env.ASSETS.fetch(request);

    // 3. SPA Routing Fallback
    // If the asset is not found (404), serve the main index.html for SPA client-side routing
    if (response.status === 404) {
      const indexRequest = new Request(new URL("/index.html", request.url).toString(), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  }
};
