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
            type: "page",
            source: "clients/*.md",
            schema: z.object({
                clients: z.array(z.object({
                    name: z.string(),
                    description: z.string(),
                    url: z.string(),
                    logo: z.string(),
                }))
            })
        })
    }
})