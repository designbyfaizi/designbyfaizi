import { useNotion } from "~~/server/utils/useNotion";

type Response = {
    skills: {
        name: string;
        image: string;
        enabled: boolean;
    }[]
    categoryTitle: string
}
export default defineEventHandler(async (event): Promise<Response> => {
    const { getSkillsBySlug, getDatabaseItems } = useNotion()
    const slug = getRouterParam(event, "slug");
    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid Slug"
        })
    }
    try {
        const category = await getSkillsBySlug(slug);
        if (!category) {
            throw createError({
                statusCode: 400,
                statusMessage: `Could not fetch skills using slug: ${slug}`
            })
        }

        const categoryId = (category.properties.id as any).rich_text[0].plain_text;
        const categoryTitle = (category.properties.category as any).title[0].plain_text;

        if (!categoryId) {
            throw createError({ statusCode: 400, statusMessage: `Invalid category ID for slug: ${slug}` });
        }

        const skills = await getDatabaseItems(categoryId);
        if (!skills || skills.length <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: `Could not fetch skills using slug: ${slug}`
            })
        }

        const formattedSkills = skills.map(skill => {
            const name = (skill.properties.name as any).title[0].plain_text
            const enabled = (skill.properties.enabled as any).checkbox
            // const image: string = (_skill?.properties?.image as any)?.files[0]?.file?.url ?? "";
            const image = "";
            return {
                name,
                image,
                enabled
            }
        })


        return { skills: formattedSkills, categoryTitle }
    }
    catch (error) {
        console.error("Error fetching skills: ", error);
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch skills" })
    }
})