import { ProjectEntry } from "@/components/portfolio/project-entry";
import type { Project } from "@/types/project";

interface ProjectGridProps {
    projects: Project[];
    variant?: "full" | "compact";
}

function ProjectGrid({ projects, variant = "full" }: ProjectGridProps) {
    return (
        <div className="space-y-0">
            {projects.map((project, index) => (
                <ProjectEntry
                    key={project.slug}
                    project={project}
                    index={index}
                    variant={variant}
                />
            ))}
        </div>
    );
}

export { ProjectGrid };
