export interface Skill {
    id: string;
    name: string;
    category: string;
    proficiency: "strong" | "comfortable" | "learning";
    description: string;
}
