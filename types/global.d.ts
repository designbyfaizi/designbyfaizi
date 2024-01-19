type Product = {
    id: number,
    name: string;
    description: string;
    to: string;
    niche: string[];
    duration: string;
    year: number;
    logo: string;
    richInfo: string;
    externalUrl?: string;
    githubRepo?: string;
    price: string;
};

type Project = {
    id: number,
    name: string;
    description: string;
    to: string;
    client: string;
    niche: string[];
    duration: string;
    year: number;
    logo: string;
    richInfo: string;
    externalUrl?: string;
    githubRepo?: string;
};

type Blog = {
    id: number,
    heading: string;
    image: string;
    richText: string;
    url: string;
    author: string;
    date: Date;
    niche: string[];
}