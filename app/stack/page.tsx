import type { Metadata } from "next";
import { getSkillsByCategory } from "@/lib/content/loader";
import { SkillGrid } from "@/components/portfolio/skill-grid";

export const metadata: Metadata = {
    title: "Rayan Tanveer — Stack",
    description: "Technologies I build with.",
};

export default function StackPage() {
    const skillsByCategory = getSkillsByCategory();

    return (
        <main className="mx-auto max-w-7xl px-6">
            <h1 className="font-serif text-4xl md:text-6xl text-codex-cream mt-24 mb-4">
                Stack
            </h1>
            <p className="font-mono text-sm text-codex-cream-muted mb-16">
                Technologies I build with.
            </p>
            <SkillGrid
                skillsByCategory={skillsByCategory}
                showProficiency={true}
            />
        </main>
    );
}
