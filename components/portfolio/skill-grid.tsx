import { SkillBadge } from "@/components/portfolio/skill-badge";
import type { Skill } from "@/types/skill";

interface SkillGridProps {
    skillsByCategory: Record<string, Skill[]>;
    showProficiency?: boolean;
}

function SkillGrid({
    skillsByCategory,
    showProficiency = false,
}: SkillGridProps) {
    return (
        <div className="space-y-8">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                    <h3 className="font-serif text-lg text-codex-cream border-b border-codex-cream/10 mb-4 pb-2">
                        {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <SkillBadge
                                key={skill.id}
                                skill={skill}
                                showProficiency={showProficiency}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { SkillGrid };
