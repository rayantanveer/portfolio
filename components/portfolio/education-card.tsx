import type { Education } from "@/types/education";

interface EducationCardProps {
    education: Education[];
}

function EducationCard({ education }: EducationCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((entry) => (
                <div
                    key={`${entry.institution}-${entry.startYear}`}
                    className="border border-codex-cream/10 rounded-sm p-4"
                >
                    <h3 className="font-serif text-codex-cream mb-1">
                        {entry.institution}
                    </h3>
                    <p className="text-codex-cream-muted text-sm mb-2">
                        {entry.degree}
                        {entry.field && ` — ${entry.field}`}
                    </p>
                    <span className="font-mono text-xs text-codex-amber/70">
                        {entry.startYear} — {entry.endYear}
                    </span>
                    {entry.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1">
                            {entry.highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="text-codex-cream-muted text-sm"
                                >
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export { EducationCard };
