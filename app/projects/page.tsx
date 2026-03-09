import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content/loader";
import { ProjectGrid } from "@/components/portfolio/project-grid";

export const metadata: Metadata = {
    title: "Rayan Tanveer — Work",
    description: "Projects and case studies.",
};

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <main className="mx-auto max-w-7xl px-6">
            <h1 className="font-serif text-4xl md:text-6xl text-codex-cream mt-24 mb-4">
                Work
            </h1>
            <p className="text-codex-cream-muted font-mono text-sm mb-16">
                Projects built in public.
            </p>
            <ProjectGrid projects={projects} variant="full" />
        </main>
    );
}
