export interface ChunkMetadata {
    documentType: "project" | "skill" | "about" | "education";
    documentTitle: string;
    documentSlug: string;
    section: string;
    url: string;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    sources?: ChunkMetadata[];
}
