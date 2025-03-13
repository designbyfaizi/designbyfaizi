export default defineEventHandler(async (): Promise<PayloadResponse<SkillCategory>> => {
    const config = useRuntimeConfig();
    const api_url = `${config.api_url}/skill-categories?depth=0&sort=name`;

    try {
        const skill_categories: PayloadResponse<SkillCategory> = await $fetch(api_url);
        console.log({ skill_categories })
        return skill_categories
    }
    catch (error: any) {
        console.error(error)
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch skill categories" })
    }
})