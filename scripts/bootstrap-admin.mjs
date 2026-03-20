import Database from "better-sqlite3";
import { join } from "node:path";
import { auth } from "../src/lib/auth.ts";

const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "blossoms1222";
const email = process.env.ADMIN_EMAIL || "admin@blossoms.local";
const authDbPath = join(process.cwd(), ".astro", "better-auth.sqlite");

const db = new Database(authDbPath);
const existingUser = db
  .prepare(
    "SELECT id, username, email FROM user WHERE username = ? OR email = ? LIMIT 1",
  )
  .get(username, email);

if (existingUser) {
  console.log(
    `Admin already exists: ${existingUser.username || existingUser.email}`,
  );
  process.exit(0);
}

await auth.api.signUpEmail({
  body: {
    email,
    password,
    name: "Blossoms Admin",
    username,
  },
});

console.log(`Admin created: ${username}`);
