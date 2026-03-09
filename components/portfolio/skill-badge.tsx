"use client";

import { useState } from "react";
import type { Skill } from "@/types/skill";

interface SkillBadgeProps {
    skill: Skill;
    showProficiency?: boolean;
}

function SkillBadge({ skill, showProficiency = false }: SkillBadgeProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 bg-codex-black-soft font-mono text-xs text-codex-cream transition-colors duration-200 ${isHovered
                    ? "border border-codex-amber/40"
                    : "border border-codex-cream/10"
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{skill.name}</span>
            {showProficiency && (
                <span className="text-codex-amber/70 text-[10px]">
                    {skill.proficiency}
                </span>
            )}
        </div>
    );
}

export { SkillBadge };
