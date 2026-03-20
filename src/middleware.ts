import { defineMiddleware } from "astro:middleware";
import { getSession } from "./lib/auth";

const protectedPrefixes = ["/admin"];
const adminUsername =
  import.meta.env.ADMIN_USERNAME || process.env.ADMIN_USERNAME;

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = new URL(context.request.url).pathname;
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthApi = pathname.startsWith("/api/auth");

  if (isAuthApi && pathname !== "/api/auth/" && !pathname.endsWith("/")) {
    return context.redirect(
      `${pathname}/${new URL(context.request.url).search}`,
      307,
    );
  }

  if (pathname === "/login/" || pathname === "/login") {
    const session = await getSession(context.request.headers);
    const username =
      session?.user && "username" in session.user
        ? session.user.username
        : undefined;

    if (session && username === adminUsername) {
      return context.redirect("/admin/posts/");
    }

    return next();
  }

  if (!isProtected) {
    return next();
  }

  const session = await getSession(context.request.headers);
  const username =
    session?.user && "username" in session.user
      ? session.user.username
      : undefined;

  if (!session || username !== adminUsername) {
    return context.redirect(`/login/?next=${encodeURIComponent(pathname)}`);
  }

  context.locals.session = session;
  return next();
});
