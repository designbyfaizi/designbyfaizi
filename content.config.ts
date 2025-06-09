import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const createBaseSchema = () => z.object({
    title: z.string(),
    description: z.string()
})

const createProjectSchema = () => z.object({
    title: z.string().nonempty(),
    type: z.string().nonempty(),
    description: z.string().nonempty(),
    image: z.string().nonempty().editor({ input: "media" }),
    url: z.string().url().nonempty(),
    tags: z.array(z.string()),
    date: z.date()
})

const createCreationSchema = () => z.object({
    title: z.string().nonempty(),
    type: z.string().nonempty(),
    description: z.string().nonempty(),
    image: z.string().nonempty().editor({ input: "media" }),
    url: z.string().url().optional(),
    github_url: z.string().url().optional(),
    tags: z.array(z.string()),
    date: z.date()
})

export default defineContentConfig({
    collections: {
        project: defineCollection({
            type: "data",
            source: "projects/*.yml",
            schema: createProjectSchema()
        }),
        creation: defineCollection({
            type: "data",
            source: "creations/*.yml",
            schema: createCreationSchema()
        }),
        content: defineCollection({
            type: "page",
            source: "**/*.md"
        }),
        skill: defineCollection({
            type: "data",
            source: "skills/**.json",
            schema: z.object({
                name: z.string(),
                slug: z.string(),
                skills: z.array(z.object({
                    name: z.string(),
                    icon: z.string(),
                    slug: z.string()
                }))
            })
        }),
        client: defineCollection({
            type: "data",
            source: "clients/*.json",
            schema: z.object({
                name: z.string(),
                slug: z.string(),
                description: z.string(),
                url: z.string(),
                logo: z.object({
                    src: z.string(),
                    alt: z.string()
                }),
                date: z.date()
            })
        }),
        blog: defineCollection({
            type: "page",
            source: "blog/*.md",
            schema: z.object({
                title: z.string().min(5).max(150),
                slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
                featured_image: z.string().url().default("https://i.redd.it/e4y2xx4h0k791.jpg"),
                author: z.string(), // Reference key to author id
                tags: z.array(z.string().min(1)).optional(),
                published: z.boolean().default(false),
                created_at: z.date(),
                updated_at: z.date().optional()
            })
        }),
        author: defineCollection({
            type: "data",
            source: "authors/*.json",
            schema: z.object({
                name: z.string().min(2),
                slug: z.string(),
                bio: z.string().optional(),
                email: z.string().email().optional(),
                avatar_url: z.string().url().optional(),
            })
        }),
        art: defineCollection({
            type: "data",
            source: "art/*.json",
            schema: z.object({
                name: z.string().min(2),
                description: z.string(),

            })
        })
    }
})