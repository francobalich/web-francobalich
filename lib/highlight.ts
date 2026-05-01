import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [
        "javascript",
        "typescript",
        "tsx",
        "jsx",
        "python",
        "bash",
        "sh",
        "sql",
        "json",
        "html",
        "css",
        "yaml",
        "markdown",
        "rust",
        "go",
      ],
    });
  }
  return highlighterPromise;
}

const FALLBACK_LANGS = new Set(["text", "plain", "plaintext", ""]);

export async function highlightCodeBlocks(html: string): Promise<string> {
  const codeBlockRegex = /<pre[^>]*><code(?:\s+class="language-([^"]*)")?[^>]*>([\s\S]*?)<\/code><\/pre>/g;

  const matches: Array<{ full: string; lang: string; code: string }> = [];
  let match;
  while ((match = codeBlockRegex.exec(html)) !== null) {
    matches.push({ full: match[0], lang: match[1] || "", code: match[2] });
  }

  if (matches.length === 0) return html;

  const highlighter = await getHighlighter();

  let result = html;
  for (const { full, lang, code } of matches) {
    if (FALLBACK_LANGS.has(lang)) continue;

    const rawCode = code
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    try {
      const highlighted = highlighter.codeToHtml(rawCode, {
        lang: lang || "text",
        theme: "github-dark",
      });
      result = result.replace(full, highlighted);
    } catch {
      // Unknown language — leave block as-is
    }
  }

  return result;
}
