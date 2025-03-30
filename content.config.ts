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
                icon: z.string(),
            })
        })
    }
})