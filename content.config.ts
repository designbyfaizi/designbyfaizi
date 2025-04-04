import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: "page",
            source: "**/*.md"
        }),
        blog: defineCollection({
            type: "page",
            source: "blog/*.md"
        }),
        skills: defineCollection({
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
        clients: defineCollection({
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
        blogs: defineCollection({
            type: "page",
            source: "blogs/*.md",
            schema: z.object({
                title: z.string().min(5).max(150),
                slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
                content: z.string().min(20),
                author: z.object({
                    id: z.string().uuid(),
                    name: z.string().min(2),
                    email: z.string().email().optional(),
                    avatarUrl: z.string().url().optional()
                }),
                tags: z.array(z.string().min(1)).optional(),
                published: z.boolean().default(false),
                createdAt: z.date(),
                updatedAt: z.date().optional()
            })
        })
    }
})