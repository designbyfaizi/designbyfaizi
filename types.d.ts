type ThemeName = "light" | "dark";

declare module "*.svg?raw" {
    const content: string;
    export default content;
}

type PayloadResponse<T> = {
    docs: T[];
    hasNextPage: boolean;
    nasPrevpage: boolean;
    limit: number;
    nextPage: any | null;
    page: number;
    pagingCounter: number;
    prevPage: any | null;
    totalDocs: number;
    totalPages: number
}

interface SkillCategory {
    id: string;
    name: string;
    slug: string;
    enabled?: boolean | null;
    skills?: Skill[] | null;
    updatedAt: string;
    createdAt: string;
}

interface Skill {
    id: string;
    name: string;
    slug: string;
    enabled?: boolean | null;
    icon?: string | null;
    updatedAt: string;
    createdAt: string;
  }

interface Client {
    id: string;
    name: string;
    url?: string | null;
    description?: string | null;
    enabled?: boolean | null;
    logo?: string | null;
    updatedAt: string;
    createdAt: string;
}
