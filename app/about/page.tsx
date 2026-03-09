import type { Metadata } from "next";
import { getAbout, getEducation } from "@/lib/content/loader";
import { EducationCard } from "@/components/portfolio/education-card";

export const metadata: Metadata = {
    title: "Rayan Tanveer — About",
    description:
        "Full Stack Developer building at the intersection of product thinking and AI engineering.",
};

export default async function AboutPage() {
    const about = await getAbout();
    const education = getEducation();

    return (
        <main className="mx-auto max-w-7xl px-6">
            {/* Name + title */}
            <h1 className="font-serif text-4xl md:text-6xl text-codex-cream mt-24 mb-2">
                {about.name}
            </h1>
            <p className="font-mono text-sm text-codex-amber tracking-widest uppercase mb-16">
                {about.title}
            </p>

            {/* Bio content */}
            <div
                className="prose-codex max-w-none"
                dangerouslySetInnerHTML={{ __html: about.contentHtml }}
            />

            {/* Separator */}
            <div className="border-t border-codex-cream/10 mt-16 pt-12" />

            {/* Education section */}
            <p className="font-mono text-xs text-codex-amber/60 tracking-widest mb-8">
                EDUCATION
            </p>
            <EducationCard education={education} />
        </main>
    );
}
