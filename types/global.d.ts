type Product = {
    name: string;
    description: string;
    to: string;
    niche: string[];
    duration: string;
    year: number;
    logo: string;
    richInfo?: string;
    externalUrl?: string;
    githubRepo?: string;
    price: string;
};

type Project = {
    name: string;
    description: string;
    to: string;
    client: string;
    niche: string;
    duration: string;
    year: number;
    logo: string;
    richInfo?: string;
    externalUrl?: string;
    githubRepo?: string;
};
