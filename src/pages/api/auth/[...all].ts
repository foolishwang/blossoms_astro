import type { APIRoute } from "astro";
import { auth } from "../../../lib/auth";

const handleAuth: APIRoute = async ({ request }) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/auth/") && url.pathname !== "/api/auth/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  const normalizedRequest = url.toString() === request.url ? request : new Request(url, request);
  return auth.handler(normalizedRequest);
};

export const GET = handleAuth;
export const POST = handleAuth;
export const PUT = handleAuth;
export const PATCH = handleAuth;
export const DELETE = handleAuth;
export const OPTIONS = handleAuth;
export const HEAD = handleAuth;
