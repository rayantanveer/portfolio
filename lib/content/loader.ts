// Server-only content loader — NO Node.js `fs` usage.
//
// All content is pre-generated at build time by scripts/generate-content.ts
// and imported here as static JSON modules. This is required because
// Cloudflare Workers have no filesystem — fs.readFileSync is unavailable.
//
// JSON data (skills, education) is imported directly from content/.

import projectsData from "@/lib/content/.generated/projects.json";
import aboutData from "@/lib/content/.generated/about.json";
import skillsData from "@/content/skills.json";
import educationData from "@/content/education.json";
import type { Project } from "@/types/project";
import type { About } from "@/types/about";
import type { Skill } from "@/types/skill";
import type { Education } from "@/types/education";

/** Returns all projects, sorted by year descending (pre-sorted at generation) */
export async function getAllProjects(): Promise<Project[]> {
    return projectsData as unknown as Project[];
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
    const projects = await getAllProjects();
    return projects.map((p) => p.slug);
}

/** Returns parsed about data (frontmatter) + rendered HTML body */
export async function getAbout(): Promise<About & { contentHtml: string }> {
    return aboutData as unknown as About & { contentHtml: string };
}

/** Returns all skills */
export function getAllSkills(): Skill[] {
    return skillsData as Skill[];
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
    return educationData as Education[];
}
