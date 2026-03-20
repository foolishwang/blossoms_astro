type EditorConfig = {
  mode: "create" | "edit";
  submitUrl: string;
  initialData?: Record<string, unknown>;
};

function fieldValue(data: Record<string, unknown> | undefined, key: string) {
  return String(data?.[key] ?? "");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function createEditorPage(config: EditorConfig) {
  const root = document.getElementById("editor-root");
  if (!root) return;

  const initialContent = fieldValue(config.initialData, "contentHtml");

  root.innerHTML = `
    <section class="editor-page">
      <div class="editor-page__header">
        <div>
          <p class="editor-eyebrow">Editorial Studio</p>
          <h1>${config.mode === "create" ? "Create blog post" : "Edit blog post"}</h1>
        </div>
        <a class="editor-back" href="/admin/posts/">Back to posts</a>
      </div>

      <div class="editor-grid">
        <form class="editor-form" method="post" action="${config.submitUrl}">
          <label><span>Title</span><input name="title" value="${escapeHtml(fieldValue(config.initialData, "title"))}" required /></label>
          <label><span>Slug</span><input name="slug" value="${escapeHtml(fieldValue(config.initialData, "slug"))}" /></label>
          <label><span>Published at</span><input name="publishedAt" value="${escapeHtml(fieldValue(config.initialData, "publishedAt"))}" /></label>
          <label><span>Featured image URL</span><input id="featured-image-url" name="featuredImageUrl" value="${escapeHtml(fieldValue(config.initialData, "featuredImageUrl"))}" /></label>
          <label><span>Excerpt</span><textarea name="excerpt" rows="4">${escapeHtml(fieldValue(config.initialData, "excerpt"))}</textarea></label>
          <label><span>Description</span><textarea name="description" rows="4">${escapeHtml(fieldValue(config.initialData, "description"))}</textarea></label>

          <section class="editor-surface">
            <div class="editor-surface__header">
              <span>Article body</span>
              <div class="editor-mode-toggle">
                <button id="visual-mode-btn" type="button" class="is-active">Visual</button>
                <button id="html-mode-btn" type="button">HTML</button>
              </div>
            </div>

            <div id="editor-toolbar" class="editor-toolbar">
              <button type="button" data-command="formatBlock" data-value="p">Paragraph</button>
              <button type="button" data-command="formatBlock" data-value="h2">H2</button>
              <button type="button" data-command="formatBlock" data-value="h3">H3</button>
              <button type="button" data-command="bold">Bold</button>
              <button type="button" data-command="italic">Italic</button>
              <button type="button" data-command="insertUnorderedList">Bullet List</button>
              <button type="button" data-command="insertOrderedList">Numbered List</button>
              <button type="button" data-command="formatBlock" data-value="blockquote">Quote</button>
              <button id="add-link-btn" type="button">Link</button>
              <button id="insert-image-btn" type="button">Image</button>
            </div>

            <div
              id="content-visual"
              class="editor-visual"
              contenteditable="true"
              spellcheck="true"
            >${initialContent}</div>
            <textarea id="content-html" name="contentHtml" rows="22" class="editor-html">${escapeHtml(initialContent)}</textarea>
          </section>

          <details class="seo-panel">
            <summary>SEO fields</summary>
            <label><span>SEO title</span><input name="seoTitle" value="${escapeHtml(fieldValue(config.initialData, "seoTitle"))}" /></label>
            <label><span>SEO description</span><textarea name="seoDescription" rows="3">${escapeHtml(fieldValue(config.initialData, "seoDescription"))}</textarea></label>
            <label><span>OG title</span><input name="ogTitle" value="${escapeHtml(fieldValue(config.initialData, "ogTitle"))}" /></label>
            <label><span>OG description</span><textarea name="ogDescription" rows="3">${escapeHtml(fieldValue(config.initialData, "ogDescription"))}</textarea></label>
            <label><span>Twitter title</span><input name="twitterTitle" value="${escapeHtml(fieldValue(config.initialData, "twitterTitle"))}" /></label>
            <label><span>Twitter description</span><textarea name="twitterDescription" rows="3">${escapeHtml(fieldValue(config.initialData, "twitterDescription"))}</textarea></label>
          </details>

          <div class="editor-actions">
            <button type="submit">${config.mode === "create" ? "Create post" : "Save changes"}</button>
            ${
              config.mode === "edit"
                ? '<button type="submit" name="_intent" value="delete" class="danger" onclick="return confirm(\'Delete this post?\')">Delete post</button>'
                : ""
            }
          </div>
        </form>

        <aside class="editor-side">
          <section class="upload-card">
            <h2>Upload image</h2>
            <form id="upload-form">
              <input type="file" name="image" accept="image/*" required />
              <button type="submit">Upload</button>
            </form>
            <p id="upload-status"></p>
          </section>

          <section class="preview-card">
            <h2>Quick insert</h2>
            <button id="insert-image-tag" type="button">Insert featured image tag</button>
          </section>
        </aside>
      </div>
    </section>
  `;

  const uploadForm = document.getElementById(
    "upload-form",
  ) as HTMLFormElement | null;
  const uploadStatus = document.getElementById("upload-status");
  const featuredImageInput = document.getElementById(
    "featured-image-url",
  ) as HTMLInputElement | null;
  const contentHtml = document.getElementById(
    "content-html",
  ) as HTMLTextAreaElement | null;
  const editorForm = root.querySelector(
    ".editor-form",
  ) as HTMLFormElement | null;
  const visualEditor = document.getElementById(
    "content-visual",
  ) as HTMLDivElement | null;
  const visualModeButton = document.getElementById(
    "visual-mode-btn",
  ) as HTMLButtonElement | null;
  const htmlModeButton = document.getElementById(
    "html-mode-btn",
  ) as HTMLButtonElement | null;
  const toolbar = document.getElementById(
    "editor-toolbar",
  ) as HTMLDivElement | null;

  let isHtmlMode = false;

  const syncHtmlFromVisual = () => {
    if (!contentHtml || !visualEditor) return;
    contentHtml.value = visualEditor.innerHTML.trim();
  };

  const syncVisualFromHtml = () => {
    if (!contentHtml || !visualEditor) return;
    visualEditor.innerHTML = contentHtml.value;
  };

  const setMode = (mode: "visual" | "html") => {
    if (
      !contentHtml ||
      !visualEditor ||
      !visualModeButton ||
      !htmlModeButton ||
      !toolbar
    )
      return;

    isHtmlMode = mode === "html";
    if (isHtmlMode) {
      syncHtmlFromVisual();
    } else {
      syncVisualFromHtml();
    }

    visualEditor.hidden = isHtmlMode;
    toolbar.hidden = isHtmlMode;
    contentHtml.hidden = !isHtmlMode;
    visualModeButton.classList.toggle("is-active", !isHtmlMode);
    htmlModeButton.classList.toggle("is-active", isHtmlMode);
  };

  toolbar?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest(
      "button[data-command]",
    ) as HTMLButtonElement | null;
    if (!button || !visualEditor) return;
    visualEditor.focus();
    document.execCommand(
      button.dataset.command || "",
      false,
      button.dataset.value || undefined,
    );
    syncHtmlFromVisual();
  });

  document.getElementById("add-link-btn")?.addEventListener("click", () => {
    if (!visualEditor) return;
    const url = window.prompt("Enter the link URL");
    if (!url) return;
    visualEditor.focus();
    document.execCommand("createLink", false, url);
    syncHtmlFromVisual();
  });

  document.getElementById("insert-image-btn")?.addEventListener("click", () => {
    if (!visualEditor || !featuredImageInput?.value) return;
    visualEditor.focus();
    document.execCommand("insertImage", false, featuredImageInput.value);
    syncHtmlFromVisual();
  });

  visualModeButton?.addEventListener("click", () => setMode("visual"));
  htmlModeButton?.addEventListener("click", () => setMode("html"));

  visualEditor?.addEventListener("input", syncHtmlFromVisual);
  contentHtml?.addEventListener("input", () => {
    if (isHtmlMode) syncVisualFromHtml();
  });

  uploadForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!uploadStatus) return;
    uploadStatus.textContent = "Uploading...";

    const formData = new FormData(uploadForm);
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json();
    if (!response.ok) {
      uploadStatus.textContent = payload.error || "Upload failed.";
      return;
    }

    if (featuredImageInput) featuredImageInput.value = payload.url;
    uploadStatus.textContent = payload.url;
  });

  document.getElementById("insert-image-tag")?.addEventListener("click", () => {
    if (!contentHtml || !featuredImageInput?.value) return;
    const snippet = `\n<figure class="wp-block-image size-full"><img src="${featuredImageInput.value}" alt="" /></figure>\n`;
    if (isHtmlMode) {
      contentHtml.setRangeText(
        snippet,
        contentHtml.selectionStart,
        contentHtml.selectionEnd,
        "end",
      );
      contentHtml.focus();
      syncVisualFromHtml();
      return;
    }
    visualEditor?.focus();
    document.execCommand("insertHTML", false, snippet);
    syncHtmlFromVisual();
  });

  editorForm?.addEventListener("submit", () => {
    if (isHtmlMode) {
      syncVisualFromHtml();
    } else {
      syncHtmlFromVisual();
    }
  });

  setMode("visual");

  const style = document.createElement("style");
  style.textContent = `
    .editor-page{display:grid;gap:1.25rem}.editor-page__header{display:flex;justify-content:space-between;align-items:end;gap:1rem}.editor-eyebrow{margin:0 0 .55rem;color:#a42a34;font-size:.78rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}.editor-page h1{margin:0;font:700 clamp(2rem,5vw,3.6rem)/.95 Raleway,serif;letter-spacing:-.05em}.editor-back{display:inline-flex;align-items:center;justify-content:center;padding:.9rem 1.1rem;border-radius:999px;border:1px solid rgba(125,58,66,.12);background:#fff;color:#24161c;text-decoration:none;font-weight:700}.editor-grid{display:grid;grid-template-columns:minmax(0,1fr) 22rem;gap:1.2rem}.editor-form,.upload-card,.preview-card{padding:1.2rem;border:1px solid rgba(125,58,66,.12);border-radius:1.5rem;background:rgba(255,255,255,.94);box-shadow:0 1.1rem 2.6rem rgba(121,57,67,.08)}.editor-form{display:grid;gap:1rem}.editor-form label,.seo-panel{display:grid;gap:.45rem}.editor-form span,.editor-surface__header span{font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6c5860}.editor-form input,.editor-form textarea{width:100%;padding:.9rem 1rem;border:1px solid rgba(125,58,66,.16);border-radius:1rem;background:#fff;font:inherit}.editor-form textarea{border-radius:1.2rem;resize:vertical;min-height:7rem}.editor-surface{display:grid;gap:.75rem}.editor-surface__header{display:flex;justify-content:space-between;align-items:center;gap:1rem}.editor-mode-toggle{display:inline-flex;padding:.25rem;border-radius:999px;background:#f7ecec;border:1px solid rgba(125,58,66,.12)}.editor-mode-toggle button{border:0;background:transparent;padding:.5rem .85rem;border-radius:999px;color:#6c5860;font:600 .82rem/1 Poppins,sans-serif;cursor:pointer}.editor-mode-toggle button.is-active{background:#fff;color:#24161c;box-shadow:0 .35rem .8rem rgba(121,57,67,.08)}.editor-toolbar{display:flex;gap:.5rem;flex-wrap:wrap;padding:.75rem;border:1px solid rgba(125,58,66,.12);border-radius:1rem;background:#fff7f7}.editor-toolbar button{border:1px solid rgba(125,58,66,.14);background:#fff;border-radius:999px;padding:.55rem .85rem;font:600 .84rem/1 Poppins,sans-serif;cursor:pointer}.editor-visual,.editor-html{min-height:28rem;padding:1.1rem 1.2rem;border:1px solid rgba(125,58,66,.16);border-radius:1.2rem;background:#fff;line-height:1.8}.editor-visual{overflow:auto}.editor-visual:focus,.editor-html:focus{outline:2px solid rgba(199,45,57,.18);border-color:rgba(199,45,57,.32)}.editor-visual h1,.editor-visual h2,.editor-visual h3{line-height:1.1}.editor-visual img{max-width:100%;height:auto;border-radius:1rem}.editor-visual blockquote{margin:1.2rem 0;padding-left:1rem;border-left:4px solid #e34c55;color:#6c5860}.editor-html{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.editor-actions{display:flex;gap:.8rem;flex-wrap:wrap}.editor-actions button,.upload-card button,.preview-card button{border:0;border-radius:999px;padding:.95rem 1.15rem;background:linear-gradient(135deg,#c72d39 0%,#e34c55 100%);color:#fff;font:700 .95rem/1 Poppins,sans-serif;cursor:pointer}.editor-actions .danger{background:#24161c}.editor-side{display:grid;gap:1rem;align-content:start}.upload-card h2,.preview-card h2{margin:0 0 .8rem;font-size:1.1rem}@media (max-width:1080px){.editor-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
}
