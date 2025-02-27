import { useNotion } from "~~/server/utils/useNotion";

type SkillCategory = {
    category: string;
    enabled: boolean;
    id: string;
    slug: string
}

export const config = { runtime: "nodejs" }; // Forces Node.js instead of edge

export default defineEventHandler(async (): Promise<SkillCategory[]> => {
    const { getSkillCategories } = useNotion()
    try {

        const _categories = await getSkillCategories();

        if (!_categories || _categories.length <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: "Could not fetch skills"
            })
        }
        const categories = _categories?.map(_category => {
            const category = (_category.properties.category as any).title[0].plain_text
            const enabled = (_category.properties.enabled as any).checkbox
            const id = (_category.properties.id as any).rich_text[0].plain_text;
            const slug = (_category.properties.slug as any).rich_text[0].plain_text;
            return {
                category,
                enabled,
                id,
                slug
            }
        })

        return categories;
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch skill categories" })
    }
})