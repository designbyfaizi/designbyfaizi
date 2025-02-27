type Response = {
    blog: {
        name: string;
        enabled: boolean;
        featured_image: string;
        publish_date: string;
        slug: string;
    },
    blogContent: string;
}

export default defineEventHandler(async (event): Promise<Response> => {
    const { getBlogBySlug, getPageContent, notionClient, notionRenderer } = useNotion()
    const slug = getRouterParam(event, "slug");
    if (!slug) {
        throw createError({
            statusCode: 404,
            statusMessage: "Invalid Slug"
        })
    }
    try {
        const blog = await getBlogBySlug(slug);
        if (!blog) {
            throw createError({
                statusCode: 400,
                statusMessage: `Could not fetch blog using slug: ${slug}`
            })
        }


        const formattedBlog = {
            name: (blog.properties.name as any).title[0].plain_text || "",
            enabled: (blog.properties.enabled as any).checkbox || false,
            featured_image: (blog.properties.featured_image as any).files[0].file.url || "",
            publish_date: (blog.properties.publish_date as any).date.start || "",
            slug: (blog.properties.slug as any).rich_text[0].plain_text || "",
            id: blog.id
        }
        const content = await getPageContent(blog.id);
        const html = await notionRenderer.render(...content.results);
        return {
            blog: formattedBlog,
            blogContent: html
        }

    }
    catch (error) {
        console.error(error)
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch blog" })
    }
})