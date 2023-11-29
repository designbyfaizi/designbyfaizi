//Kelsterbach

export const useBlogs = defineStore("blogs", () => {
    const blogs: Blog[] = [
        {
            id: 1,
            heading: "Blog Name UwU",
            image: "https://img.freepik.com/free-vector/gradient-grainy-texture_23-2148976749.jpg",
            richText: `Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Sapiente blanditiis
            repellendus rerum provident ipsam dicta
            perferendis voluptatibus eligendi, laborum
            saepe modi esse nihil praesentium. Optio
            placeat qui voluptatum officiis? Possimus!`,
            url: "/blog/blog1",
            author: "Faizi",
        },
        {
            id: 2,
            heading: "2nd Blog UwU",
            image: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922133.jpg",
            richText: `Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Sapiente blanditiis
            repellendus rerum provident ipsam dicta
            perferendis voluptatibus eligendi, laborum
            saepe modi esse nihil praesentium. Optio
            placeat qui voluptatum officiis? Possimus!`,
            url: "/blog/blog2",
            author: "Faizi",
        },
        {
            id: 3,
            heading: "3rd Blog UwU",
            image: "https://img.freepik.com/free-vector/gradient-grainy-gradient-background_23-2149922146.jpg",
            richText: `Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Sapiente blanditiis
            repellendus rerum provident ipsam dicta
            perferendis voluptatibus eligendi, laborum
            saepe modi esse nihil praesentium. Optio
            placeat qui voluptatum officiis? Possimus!`,
            url: "/blog/blog3",
            author: "Faizi",
        },
    ];
    return { blogs };
});
