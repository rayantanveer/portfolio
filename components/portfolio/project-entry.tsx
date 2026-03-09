"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";

interface ProjectEntryProps {
    project: Project;
    index: number;
    variant?: "full" | "compact";
}

function ProjectEntry({ project, index, variant = "full" }: ProjectEntryProps) {
    const entryNumber = String(index + 1).padStart(2, "0");
    const isFull = variant === "full";

    return (
        <Link href={`/projects/${project.slug}`} className="block group">
            <motion.article
                className="relative py-6 md:py-8 border-b border-codex-cream/10"
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                {/* Amber underline on hover — slides in from left */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-codex-amber"
                    variants={{
                        rest: { scaleX: 0, transformOrigin: "left" },
                        hover: { scaleX: 1, transformOrigin: "left" },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />

                <div className="flex items-start justify-between gap-4">
                    {/* Left: Number + Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                            <span className="font-mono text-xs text-codex-amber/50 shrink-0">
                                {entryNumber}
                            </span>
                            <motion.h3
                                className={`font-serif text-codex-cream leading-tight ${isFull
                                        ? "text-2xl md:text-3xl"
                                        : "text-xl md:text-2xl"
                                    }`}
                                variants={{
                                    rest: { x: 0 },
                                    hover: { x: 8 },
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {project.title}
                            </motion.h3>
                        </div>

                        <p className="text-codex-cream-muted text-sm md:text-base mb-3 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="border-codex-amber/30 text-codex-amber/70 bg-transparent text-[10px] md:text-xs"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Right: Year, Category, Links */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="text-right">
                            <span className="font-mono text-xs text-codex-cream-muted block">
                                {project.year}
                            </span>
                            <span className="font-mono text-xs text-codex-cream-muted block">
                                {project.category}
                            </span>
                        </div>

                        {/* Icon links — only if URL is not empty */}
                        <div className="flex gap-2">
                            {project.liveUrl && (
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(project.liveUrl, "_blank", "noopener");
                                    }}
                                    className="text-codex-cream-muted hover:text-codex-amber transition-colors cursor-pointer"
                                    aria-label="Live demo"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </span>
                            )}
                            {project.githubUrl && (
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(project.githubUrl, "_blank", "noopener");
                                    }}
                                    className="text-codex-cream-muted hover:text-codex-amber transition-colors cursor-pointer"
                                    aria-label="GitHub repository"
                                >
                                    <Github className="w-3.5 h-3.5" />
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}

export { ProjectEntry };
