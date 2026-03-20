import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

const resolvedBaseURL =
  import.meta.env.PUBLIC_BETTER_AUTH_URL ||
  (typeof window !== "undefined"
    ? `${window.location.origin}/api/auth/`
    : "http://localhost:4322/api/auth/");

export const authClient = createAuthClient({
  baseURL: resolvedBaseURL,
  plugins: [usernameClient()],
});
