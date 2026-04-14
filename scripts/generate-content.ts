/**
 * Pre-build content generation script.
 *
 * Reads all markdown content files via Node.js `fs`, parses frontmatter,
 * renders markdown → HTML, and writes the results as JSON files that the
 * Next.js app can import without `fs`.
 *
 * This is required because Cloudflare Workers have no filesystem —
 * fs.readFileSync crashes the worker at runtime. By generating static
 * JSON at build time, we eliminate all runtime `fs` calls.
 *
 * Runs automatically before every `next build` and `next dev`.
 */

import fs from "fs";
import path from "path";
import fm from "front-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");
const outputDir = path.join(process.cwd(), "lib", "content", ".generated");

async function renderMarkdown(markdown: string): Promise<string> {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

async function generateProjects() {
    const projectsDir = path.join(contentDir, "projects");
    const fileNames = fs
        .readdirSync(projectsDir)
        .filter((name) => name.endsWith(".md") && name !== "_template.md");

    const projects = await Promise.all(
        fileNames.map(async (fileName) => {
            const filePath = path.join(projectsDir, fileName);
            const fileContents = fs.readFileSync(filePath, "utf-8");
            const { attributes, body } = fm<Record<string, unknown>>(fileContents);
            const contentHtml = await renderMarkdown(body);

            return {
                ...attributes,
                content: body,
                contentHtml,
            };
        })
    );

    // Sort by year descending (matching the original loader behaviour)
    projects.sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
        (b.year as number) - (a.year as number)
    );

    return projects;
}

async function generateAbout() {
    const filePath = path.join(contentDir, "about.md");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { attributes, body } = fm<Record<string, unknown>>(fileContents);
    const contentHtml = await renderMarkdown(body);

    return {
        ...attributes,
        content: body,
        contentHtml,
    };
}

async function main() {
    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Generate projects
    const projects = await generateProjects();
    fs.writeFileSync(
        path.join(outputDir, "projects.json"),
        JSON.stringify(projects, null, 2),
        "utf-8"
    );

    // Generate about
    const about = await generateAbout();
    fs.writeFileSync(
        path.join(outputDir, "about.json"),
        JSON.stringify(about, null, 2),
        "utf-8"
    );

    console.log(
        `✅ Content generated — ${projects.length} projects, 1 about page → lib/content/.generated/`
    );
}

main().catch((err) => {
    console.error("❌ Content generation failed:", err);
    process.exit(1);
});
