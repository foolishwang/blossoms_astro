import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const baseURL =
  import.meta.env.BETTER_AUTH_URL ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:4322";

let authInstance: ReturnType<typeof betterAuth> | null = null;

function getAuth() {
  if (authInstance) {
    return authInstance;
  }

  const authDirectory = join(process.cwd(), ".astro");
  const authDatabasePath = join(authDirectory, "better-auth.sqlite");

  if (!existsSync(authDirectory)) {
    mkdirSync(authDirectory, { recursive: true });
  }

  const authDatabase = new Database(authDatabasePath);

  authInstance = betterAuth({
    appName: "Blossoms Admin",
    baseURL,
    secret:
      import.meta.env.BETTER_AUTH_SECRET ||
      process.env.BETTER_AUTH_SECRET ||
      "blossoms-admin-secret-change-me-2026",
    database: authDatabase,
    trustedOrigins: [
      "http://localhost:4321",
      "http://127.0.0.1:4321",
      "http://localhost:4322",
      "http://127.0.0.1:4322",
      "https://www.blossoms.com",
    ],
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      disableSignUp:
        (import.meta.env.ALLOW_ADMIN_BOOTSTRAP ||
          process.env.ALLOW_ADMIN_BOOTSTRAP) !== "true",
    },
    plugins: [username()],
  });

  return authInstance;
}

export function getAuthHandler() {
  return getAuth();
}

export async function getSession(headers: Headers) {
  return getAuth().api.getSession({ headers });
}

export async function requireAdmin(headers: Headers) {
  const session = await getSession(headers);
  const username =
    session?.user && "username" in session.user
      ? session.user.username
      : undefined;

  const adminUsername =
    import.meta.env.ADMIN_USERNAME || process.env.ADMIN_USERNAME;

  if (!session || username !== adminUsername) {
    return null;
  }

  return session;
}
