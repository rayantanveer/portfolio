import Link from "next/link";
import { getAbout } from "@/lib/content/loader";
import { getFeaturedProjects } from "@/lib/content/loader";
import { getEducation } from "@/lib/content/loader";
import { Hero } from "@/components/layout/hero";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { EducationTimeline } from "@/components/portfolio/education-timeline";

// The four Q&A pairs — questions correspond to the four paragraphs in about.md (in order)
const QA_QUESTIONS = [
    "How did you get into development?",
    "What kind of problems genuinely excite you to build solutions for?",
    "How do you describe your approach to building?",
    "One sentence about where you're headed — what kind of work or role are you building toward?",
];

export default async function Home() {
    const about = await getAbout();
    const featuredProjects = await getFeaturedProjects();
    const education = getEducation();

    // Split raw markdown body into individual paragraphs
    // Use non-capturing (?:\r?\n) to handle Windows CRLF line endings without polluting the array
    const paragraphs = about.content
        .split(/(?:\r?\n){2,}/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0 && !p.startsWith("#"));

    return (
        <main>
            {/* Section 1 — Hero */}
            <Hero
                name={about.name}
                title={about.title}
                shortBio={about.shortBio}
            />

            {/* Section 2 — Selected Work */}
            <section className="mx-auto max-w-7xl px-6 py-24">
                <p className="font-mono text-sm font-semibold text-codex-amber/80 tracking-widest mb-12">
                    SELECTED WORK
                </p>
                <ProjectGrid
                    projects={featuredProjects}
                    variant="compact"
                />
                <div className="mt-8">
                    <Link
                        href="/projects"
                        className="font-mono text-sm text-codex-amber hover:text-codex-amber/70 transition-colors"
                    >
                        View all projects →
                    </Link>
                </div>
            </section>

            {/* Section 3 — About Q&A */}
            <section className="mx-auto max-w-7xl px-6 pt-12 pb-24">
                <p className="font-mono text-sm font-semibold text-codex-amber/80 tracking-widest mb-16">
                    A BIT ABOUT ME
                </p>
                <div className="flex flex-col gap-14">
                    {QA_QUESTIONS.map((question, i) => {
                        const answer = paragraphs[i];
                        if (!answer) return null;
                        return (
                            <div
                                key={i}
                                className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-16"
                            >
                                {/* Question */}
                                <p className="font-mono text-xs text-codex-amber/70 tracking-wide leading-relaxed md:pt-1">
                                    {question}
                                </p>
                                {/* Answer */}
                                <p className="text-codex-cream-muted leading-relaxed">
                                    {answer}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Section 4 — Education Timeline */}
            <section className="mx-auto max-w-7xl px-6 pt-12 pb-16">
                <p className="font-mono text-sm font-semibold text-codex-amber/80 tracking-widest mb-12">
                    EDUCATION
                </p>
                <EducationTimeline education={education} />
            </section>
        </main>
    );
}
