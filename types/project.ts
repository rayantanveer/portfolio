export interface ProjectFrontmatter {
    slug: string;
    title: string;
    status: "completed" | "in-progress";
    featured: boolean;
    year: number;
    description: string;
    coverImage: string;
    liveUrl: string;
    githubUrl: string;
    category: string;
    tags: string[];
    problem: string;
    solution: string;
    aiElement: string;
    techStackDetails: string;
    challenges: string[];
    learnings: string[];
}

export interface Project extends ProjectFrontmatter {
    content: string;
}
