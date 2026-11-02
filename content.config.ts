import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const pageIntro = z.object({ heading: z.string(), intro: z.string() });

const date = z.coerce.date();

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: "data",
      source: "site.yml",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        name: z.string(),
        nickname: z.string(),
        bio: z.string(),
        email: z.string().email(),
        location: z.string(),
        timezone: z.string(),
        footer: z.string(),
        socials: z.array(z.object({ label: z.string(), url: z.string() })),
        hero: z.object({
          greeting: z.string(),
          statement: z.string(),
          avatar: z.string(),
          avatar_alt: z.string(),
          button_text: z.string(),
          available: z.boolean(),
          availability_text: z.string(),
        }),
        marquee: z.array(z.string()),
        intro: z.object({
          title: z.string(),
          statement: z.string(),
          note: z.string(),
          photo: z.string(),
          photo_alt: z.string(),
          button_text: z.string(),
        }),
        process: z.object({
          title: z.string(),
          steps: z.array(z.object({ title: z.string(), text: z.string() })),
        }),
        terminal: z.object({
          title: z.string(),
          note: z.string(),
          os: z.string(),
          kernel: z.string(),
          wm: z.string(),
          shell: z.string(),
          uptime: z.string(),
          cpu: z.string(),
          motto: z.string(),
        }),
        sections: z.object({
          work: z.string(),
          skills: z.string(),
          clients: z.string(),
          art: z.string(),
          art_note: z.string(),
          journal: z.string(),
        }),
        closing: z.object({
          title: z.string(),
          text: z.string(),
          button_text: z.string(),
        }),
        projects: pageIntro,
        creations: pageIntro,
        skills: pageIntro,
        blog: pageIntro,
        art: pageIntro,
        contact: pageIntro,
      }),
    }),
    client: defineCollection({
      type: "data",
      source: "clients/*.yml",
      schema: z.object({
        name: z.string(),
        logo: z.string(),
        url: z.string().optional(),
        order: z.number(),
      }),
    }),
    project: defineCollection({
      type: "data",
      source: "projects/*.yml",
      schema: z.object({
        title: z.string(),
        type: z.string(),
        description: z.string(),
        image: z.string(),
        cover: z.string().optional(),
        url: z.string().url(),
        tags: z.array(z.string()),
        date,
      }),
    }),
    creation: defineCollection({
      type: "data",
      source: "creations/*.yml",
      schema: z.object({
        title: z.string(),
        type: z.string(),
        description: z.string(),
        image: z.string(),
        url: z.string().url().optional(),
        github_url: z.string().url().optional(),
        tags: z.array(z.string()),
        date,
      }),
    }),
    skill: defineCollection({
      type: "data",
      source: "skills/*.yml",
      schema: z.object({
        name: z.string(),
        order: z.number(),
        skills: z.array(z.object({ name: z.string(), icon: z.string() })),
      }),
    }),
    art: defineCollection({
      type: "data",
      source: "art/*.yml",
      schema: z.object({
        title: z.string(),
        series: z.string(),
        description: z.string(),
        image: z.string(),
        link: z.string().url().optional(),
        picked: z.boolean().default(false),
        order: z.number(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        featured_image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        published: z.boolean().default(false),
        created_at: date,
        updated_at: date.optional(),
        rawbody: z.string(),
      }),
    }),
  },
});
