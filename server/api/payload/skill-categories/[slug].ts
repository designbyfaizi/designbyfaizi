import { stringifyQuery } from "vue-router";

export default defineEventHandler(async (event): Promise<SkillCategory> => {
    const slug = getRouterParam(event, "slug");
    const config = useRuntimeConfig()
    const api_url = `${config.api_url}/skill-categories?where[slug][equals]=${slug}&depth=2&sort=name`
    try {
        const skills: PayloadResponse<SkillCategory> = await $fetch(api_url);
        const sortedSkills = skills.docs[0].skills?.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        return {
            ...skills.docs[0],
            skills: sortedSkills
        };
    }
    catch (error: any) {
        console.error(error)
        throw createError({ statusCode: 500, statusMessage: `Failed to fetch '${slug}' skills` })
    }
}) 