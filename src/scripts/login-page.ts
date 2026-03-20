import { authClient } from "../lib/auth-client";

const form = document.getElementById("login-form") as HTMLFormElement | null;
const errorNode = document.getElementById(
  "login-error",
) as HTMLParagraphElement | null;
const submitButton = document.getElementById(
  "login-submit",
) as HTMLButtonElement | null;

if (form && errorNode && submitButton) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    errorNode.hidden = true;
    errorNode.textContent = "";
    submitButton.disabled = true;
    submitButton.textContent = "Signing In...";

    const data = new FormData(form);
    const next = form.dataset.next || "/admin/posts/";

    try {
      const { error } = await authClient.signIn.username({
        username: String(data.get("username") || ""),
        password: String(data.get("password") || ""),
      });

      if (error) {
        errorNode.textContent = error.message || "Unable to sign in.";
        errorNode.hidden = false;
        return;
      }

      window.location.href = next;
    } catch (error) {
      errorNode.textContent =
        error instanceof Error
          ? error.message
          : "Something went wrong while signing in.";
      errorNode.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Sign In";
    }
  });
}
