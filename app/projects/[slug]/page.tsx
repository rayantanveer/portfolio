import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import {
    getProjectBySlug,
    getAllProjects,
    getAllProjectSlugs,
} from "@/lib/content/loader";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
        title: `Rayan Tanveer — ${project.title}`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Derive entry number from position in sorted list
    const allProjects = await getAllProjects();
    const entryIndex =
        allProjects.findIndex((p) => p.slug === project.slug) + 1;
    const entryNumber = String(entryIndex).padStart(2, "0");

    return (
        <main className="mx-auto max-w-7xl px-6">
            {/* Back link */}
            <Link
                href="/projects"
                className="inline-block font-mono text-sm text-codex-amber mt-24 mb-8 hover:text-codex-amber/70 transition-colors"
            >
                ← Projects
            </Link>

            {/* Entry number */}
            <p className="font-mono text-codex-amber/40 text-sm">
                {entryNumber}
            </p>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl text-codex-cream mt-4 mb-2">
                {project.title}
            </h1>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="font-mono text-xs text-codex-cream-muted">
                    {project.year}
                </span>
                <span className="text-codex-cream/20">·</span>
                <span className="font-mono text-xs text-codex-cream-muted">
                    {project.category}
                </span>
                <span className="text-codex-cream/20">·</span>
                {project.tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs bg-codex-black-soft text-codex-cream-muted border border-codex-cream/10"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            {/* External links */}
            <div className="flex items-center gap-4 mt-4">
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-codex-amber hover:text-codex-amber/70 transition-colors"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                    </a>
                )}
                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-codex-amber hover:text-codex-amber/70 transition-colors"
                    >
                        <Github className="h-3.5 w-3.5" />
                        Source
                    </a>
                )}
            </div>

            {/* Divider */}
            <div className="border-b border-codex-cream/10 my-8" />

            {/* Project content */}
            <div
                className="prose-codex max-w-none pb-16"
                dangerouslySetInnerHTML={{ __html: project.contentHtml }}
            />
        </main>
    );
}
