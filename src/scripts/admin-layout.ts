import { authClient } from "../lib/auth-client";

document
  .getElementById("logout-button")
  ?.addEventListener("click", async () => {
    await authClient.signOut();
    window.location.href = "/login";
  });
