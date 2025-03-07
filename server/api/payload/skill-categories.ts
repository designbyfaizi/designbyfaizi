export default defineEventHandler(async (): Promise<PayloadResponse<SkillCategory>> => {
    const config = useRuntimeConfig();
    const api_url = `${config.api_url}/skill-categories?depth=0&sort=name`;

    try {
        const skill_categories: PayloadResponse<SkillCategory> = await $fetch(api_url);
        if (!skill_categories?.docs || skill_categories?.docs?.length <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: "Could not fetch skills"
            })
        }
        return skill_categories
    }
    catch (error: any) {
        console.error(error)
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch skill categories" })
    }
})