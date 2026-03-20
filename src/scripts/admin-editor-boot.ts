import { createEditorPage } from "./admin-editor-page";

const root = document.getElementById("editor-root");

if (root) {
  const mode = root.getAttribute("data-mode");
  const submitUrl = root.getAttribute("data-submit-url");
  const initialJson = root.getAttribute("data-initial-json");

  createEditorPage({
    mode: mode === "edit" ? "edit" : "create",
    submitUrl: submitUrl || "/api/admin/posts",
    initialData: initialJson ? JSON.parse(initialJson) : undefined,
  });
}
