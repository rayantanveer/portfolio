// Server-only: uses Node.js fs module — do not import from client components

import fs from "fs";
import path from "path";
import fm from "front-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project, ProjectFrontmatter } from "@/types/project";
import type { About } from "@/types/about";
import type { Skill } from "@/types/skill";
import type { Education } from "@/types/education";

const contentDirectory = path.join(process.cwd(), "content");
const projectsDirectory = path.join(contentDirectory, "projects");

async function renderMarkdown(markdown: string): Promise<string> {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

/** Returns all projects excluding _template.md, sorted by year descending */
export async function getAllProjects(): Promise<Project[]> {
    const fileNames = fs
        .readdirSync(projectsDirectory)
        .filter((name) => name.endsWith(".md") && name !== "_template.md");

    const projects = await Promise.all(
        fileNames.map(async (fileName) => {
            const filePath = path.join(projectsDirectory, fileName);
            const fileContents = fs.readFileSync(filePath, "utf-8");
            const { attributes, body } = fm<ProjectFrontmatter>(fileContents);
            const contentHtml = await renderMarkdown(body);

            return {
                ...attributes,
                content: body,
                contentHtml,
            };
        })
    );

    return projects.sort((a, b) => b.year - a.year);
}

/** Returns a single project by slug, or null if not found */
export async function getProjectBySlug(
    slug: string
): Promise<Project | null> {
    const projects = await getAllProjects();
    return projects.find((p) => p.slug === slug) ?? null;
}

/** Returns only projects where featured === true */
export async function getFeaturedProjects(): Promise<Project[]> {
    const projects = await getAllProjects();
    return projects.filter((p) => p.featured);
}

/** Returns all slugs — used for generateStaticParams */
export async function getAllProjectSlugs(): Promise<string[]> {
    const fileNames = fs
        .readdirSync(projectsDirectory)
        .filter((name) => name.endsWith(".md") && name !== "_template.md");

    return fileNames.map((fileName) => {
        const filePath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const { attributes } = fm<ProjectFrontmatter>(fileContents);
        return attributes.slug;
    });
}

/** Returns parsed about data (frontmatter) + rendered HTML body */
export async function getAbout(): Promise<About & { contentHtml: string }> {
    const filePath = path.join(contentDirectory, "about.md");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { attributes, body } = fm<Record<string, unknown>>(fileContents);
    const contentHtml = await renderMarkdown(body);

    return {
        ...(attributes as Omit<About, "content">),
        content: body,
        contentHtml,
    };
}

/** Returns all skills */
export function getAllSkills(): Skill[] {
    const filePath = path.join(contentDirectory, "skills.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents) as Skill[];
}

const CATEGORY_ORDER = [
    "Frontend",
    "Backend",
    "AI/ML",
    "Database",
    "DevOps",
    "Tools",
];

/** Returns skills grouped by category, preserving category order */
export function getSkillsByCategory(): Record<string, Skill[]> {
    const skills = getAllSkills();
    const grouped: Record<string, Skill[]> = {};

    for (const category of CATEGORY_ORDER) {
        const categorySkills = skills.filter((s) => s.category === category);
        if (categorySkills.length > 0) {
            grouped[category] = categorySkills;
        }
    }

    // Include any categories not in the predefined order
    for (const skill of skills) {
        if (!CATEGORY_ORDER.includes(skill.category)) {
            if (!grouped[skill.category]) {
                grouped[skill.category] = [];
            }
            grouped[skill.category].push(skill);
        }
    }

    return grouped;
}

/** Returns education entries */
export function getEducation(): Education[] {
    const filePath = path.join(contentDirectory, "education.json");
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents) as Education[];
}
