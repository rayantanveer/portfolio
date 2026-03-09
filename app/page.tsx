import Link from "next/link";
import { getAbout } from "@/lib/content/loader";
import { getFeaturedProjects } from "@/lib/content/loader";
import { getAllSkills } from "@/lib/content/loader";
import { Hero } from "@/components/layout/hero";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { SkillBadge } from "@/components/portfolio/skill-badge";

export default async function Home() {
    const about = await getAbout();
    const featuredProjects = await getFeaturedProjects();
    const allSkills = getAllSkills();

    // First 6 skills from AI/ML and Frontend categories combined
    const previewSkills = allSkills
        .filter(
            (s) => s.category === "AI/ML" || s.category === "Frontend"
        )
        .slice(0, 6);

    return (
        <main>
            {/* Section 1 — Hero */}
            <Hero
                name={about.name}
                title={about.title}
                shortBio={about.shortBio}
            />

            {/* Section 2 — Featured Work */}
            <section className="mx-auto max-w-7xl px-6 py-24">
                <p className="font-mono text-xs text-codex-amber/60 tracking-widest mb-12">
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
                        View all work →
                    </Link>
                </div>
            </section>

            {/* Section 3 — Stack Preview */}
            <section className="mx-auto max-w-7xl px-6 pb-24">
                <p className="font-mono text-xs text-codex-amber/60 tracking-widest mb-12">
                    BUILT WITH
                </p>
                <div className="flex flex-wrap gap-2">
                    {previewSkills.map((skill) => (
                        <SkillBadge
                            key={skill.id}
                            skill={skill}
                            showProficiency={false}
                        />
                    ))}
                </div>
                <div className="mt-8">
                    <Link
                        href="/stack"
                        className="font-mono text-sm text-codex-amber hover:text-codex-amber/70 transition-colors"
                    >
                        Full stack →
                    </Link>
                </div>
            </section>
        </main>
    );
}
