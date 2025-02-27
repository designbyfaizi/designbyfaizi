type Blog = {
    name: string;
    enabled: boolean;
    featured_image: string;
    publish_date: string;
    slug: string;
}

export default defineEventHandler(async (): Promise<Blog[]> => {
    const { notionKnowledgeHubId } = useRuntimeConfig();
    const { getDatabaseItems } = useNotion()
    try {
        const blogs = await getDatabaseItems(notionKnowledgeHubId);

        if (!blogs || blogs.length <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: "Could not fetch skills"
            })
        }

        const formattedBlogs = blogs.map((blog) => {
            const name = (blog.properties.name as any).title[0].plain_text || "";
            const enabled = (blog.properties.enabled as any).checkbox || false;
            const featured_image = (blog.properties.featured_image as any).files[0].file.url || "";
            const publish_date = (blog.properties.publish_date as any).date.start || "";
            const slug = (blog.properties.slug as any).rich_text[0].plain_text || "";

            return {
                name, enabled, featured_image, publish_date, slug
            }
        })

        return formattedBlogs
    }
    catch (error) {
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch blogs" })
    }
})