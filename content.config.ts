import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const createBaseSchema = () => z.object({
    title: z.string(),
    description: z.string()
})

const createButtonSchema = () => z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
    target: z.enum(['_blank', '_self']).optional()
})

const createProjectSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    image: z.string().nonempty().editor({ input: "media" }),
    url: z.string().url().nonempty(),
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
                })
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