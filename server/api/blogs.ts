import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    // const data = await prisma.blogs.findMany({});
    const data = [
        {
            id: 1,
            created_at: "2024-03-31T03:27:57.140Z",
            title: "First Blog",
            rich_text: "Blog Rich Text",
            time_to_read: 15,
        },
    ];
    return data;
});
