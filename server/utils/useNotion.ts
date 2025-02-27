import { NotionRenderer } from "@notion-render/client";
import { Client } from "@notionhq/client";
import type { BlockObjectResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
const NOTION_API_ENDPOINT = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import hljsPlugin from "@notion-render/hljs-plugin";


export function useNotion() {
    const config = useRuntimeConfig();

    const notionSecret = config.notionSecret;
    const notionSkillsId = config.notionSkillsId;
    const notionBlogsId = config.notionKnowledgeHubId;

    const notionClient = new Client({
        auth: notionSecret
    })
    const notionRenderer = new NotionRenderer({ client: notionClient });
    notionRenderer.use(hljsPlugin({}));
    notionRenderer.use(bookmarkPlugin(undefined));

    const getSkillCategories = async (): Promise<NotionResponse[]> => {
        try {
            const response = await $fetch(`${NOTION_API_ENDPOINT}/databases/${notionSkillsId}/query`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${notionSecret}`,
                    "Notion-Version": NOTION_VERSION,
                    "Content-Type": "application/json"
                },
                body: {
                    filter: {
                        property: "enabled",
                        checkbox: { equals: true }
                    },
                    sorts: [
                        {
                            property: "category",
                            direction: "ascending"
                        }
                    ]
                }
            })
            return (response as any).results as NotionResponse[];
        }
        catch (error: any) {
            console.error("Error fetching skill categories: ", error)
            throw new Error(error)
        }
    }

    const getDatabaseItems = async (databaseId: string): Promise<NotionResponse[]> => {
        try {
            const response = await $fetch(`${NOTION_API_ENDPOINT}/databases/${databaseId}/query`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${notionSecret}`,
                    "Notion-Version": NOTION_VERSION,
                    "Content-Type": "application/json"
                },
                body: {
                    filter: {
                        property: "enabled",
                        checkbox: { equals: true }
                    },
                    sorts: [
                        {
                            property: "name",
                            direction: "ascending"
                        }
                    ]
                }
            })
            return (response as any).results as NotionResponse[];
        }
        catch (error: any) {
            console.error("Error fetching database items: ", error)
            throw new Error(error)
        }
    }

    const getSkillsBySlug = async (slug: string): Promise<NotionResponse | undefined> => {
        try {
            const response = await $fetch(`${NOTION_API_ENDPOINT}/databases/${notionSkillsId}/query`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${notionSecret}`,
                    "Notion-Version": NOTION_VERSION,
                    "Content-Type": "application/json"
                },
                body: {

                    filter: {
                        and: [
                            {
                                property: "slug",
                                rich_text: { equals: slug }
                            },
                            {
                                property: "enabled",
                                checkbox: { equals: true }
                            }
                        ],
                    }
                }
            })
            return (response as any).results[0] as NotionResponse | undefined;
        }
        catch (error: any) {
            console.error("Error fetching the skills by slug: ", error)
            throw new Error(error)
        }
    }

    const getBlogBySlug = async (slug: string): Promise<NotionResponse | undefined> => {
        try {
            const response = await $fetch(`${NOTION_API_ENDPOINT}/databases/${notionBlogsId}/query`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${notionSecret}`,
                    "Notion-Version": NOTION_VERSION,
                    "Content-Type": "application/json"
                },
                body: {

                    filter: {
                        and: [
                            {
                                property: "slug",
                                rich_text: { equals: slug }
                            },
                            {
                                property: "enabled",
                                checkbox: { equals: true }
                            }
                        ],
                    }
                }
            })
            return (response as any).results[0] as NotionResponse | undefined;
        }
        catch (error: any) {
            console.error("Error fetching the skills by slug: ", error)
            throw new Error(error)
        }
    }

    const getPageContent = async (pageId: string): Promise<any> => {
        try {
            const response = await $fetch(`${NOTION_API_ENDPOINT}/blocks/${pageId}/children?page_size=100`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${notionSecret}`,
                    "Notion-Version": NOTION_VERSION,
                }
            })

            return response;
        }
        catch (error: any) {
            console.error("Error fetching the page content: ", error)
            throw new Error(error)
        }
    }

    const testApiCall = async () => {
        try {
            const response = await $fetch("https://jsonplaceholder.typicode.com/todos/1");
            console.log("API Response: ", response);
            return response;
        }
        catch (error) {
            console.error("API call failed: ", error)
        }
    }

    return {
        notionClient,
        notionRenderer,
        getSkillCategories,
        getSkillsBySlug,
        getDatabaseItems,
        testApiCall,
        getBlogBySlug,
        getPageContent
    }

}