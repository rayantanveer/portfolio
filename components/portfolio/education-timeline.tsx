"use client";

import { useState } from "react";
import type { Education } from "@/types/education";

interface EducationTimelineProps {
    education: Education[];
}

function EducationTimeline({ education }: EducationTimelineProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    function handleToggle(index: number) {
        setActiveIndex((prev) => (prev === index ? null : index));
    }

    return (
        <div className="flex flex-col">
            {education.map((entry, index) => {
                const isActive = activeIndex === index;
                const isLast = index === education.length - 1;
                const label = index === 0 ? "University" : "Schooling";

                return (
                    <div
                        key={`${entry.institution}-${entry.startYear}`}
                        className="flex gap-6"
                    >
                        {/* Left column: dot + connecting line below */}
                        <div className="flex flex-col items-center flex-shrink-0">
                            {/* Dot */}
                            <div
                                className="relative flex items-center justify-center mt-1.5 flex-shrink-0 cursor-pointer"
                                style={{
                                    width: isActive ? "1rem" : "0.625rem",
                                    height: isActive ? "1rem" : "0.625rem",
                                    transition: "width 0.3s, height 0.3s",
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                onClick={() => handleToggle(index)}
                            >
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full bg-codex-amber/25 blur-sm scale-150" />
                                )}
                                <div
                                    className={`relative rounded-full bg-codex-amber transition-all duration-300 ${
                                        isActive
                                            ? "w-4 h-4 shadow-[0_0_10px_4px_rgba(232,168,62,0.35)]"
                                            : "w-2.5 h-2.5"
                                    }`}
                                />
                            </div>

                            {/* Connecting line — only between entries, not after the last */}
                            {!isLast && (
                                <div className="flex-1 w-px bg-codex-amber/30 mt-1 mb-1" />
                            )}
                        </div>

                        {/* Right column: content */}
                        <div
                            className={`pb-10 cursor-pointer select-none transition-all duration-300 ${
                                isActive ? "translate-x-2" : "translate-x-0"
                            }`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            onClick={() => handleToggle(index)}
                        >
                            <div className="flex items-baseline gap-3 mb-1">
                                <span className="font-mono text-[10px] text-codex-amber/50 tracking-widest uppercase">
                                    {label}
                                </span>
                                <span className="font-mono text-[10px] text-codex-cream/20">
                                    {entry.startYear} — {entry.endYear}
                                </span>
                            </div>

                            <h3 className="font-serif text-codex-cream text-base">
                                {entry.institution}
                            </h3>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    isActive
                                        ? "max-h-24 opacity-100 mt-2"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <p className="text-codex-cream-muted text-sm">
                                    {entry.degree}
                                    {entry.field &&
                                        entry.field !== entry.degree &&
                                        ` — ${entry.field}`}
                                </p>
                                {entry.highlights.length > 0 && (
                                    <p className="font-mono text-xs text-codex-amber/60 mt-1">
                                        {entry.highlights[0]}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export { EducationTimeline };
