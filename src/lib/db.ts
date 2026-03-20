import { createClient } from "@libsql/client";

const databaseUrl =
  import.meta.env.TURSO_DATABASE_URL ||
  process.env.TURSO_DATABASE_URL ||
  "libsql://blossomsastro-weixiyu.aws-us-west-2.turso.io";
const authToken =
  import.meta.env.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN;

if (!authToken) {
  throw new Error("Missing TURSO_AUTH_TOKEN");
}

let client: ReturnType<typeof createClient> | undefined;

export function getDb() {
  if (!client) {
    client = createClient({
      url: databaseUrl,
      authToken,
    });
  }

  return client;
}

export { databaseUrl };
