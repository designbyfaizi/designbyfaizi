export const useNav = defineStore("nav", () => {
    const navLinks = [
        { name: "Home", to: "/", icon: "ph:house" },
        { name: "Projects", to: "/projects", icon: "ph:cursor-click" },
        { name: "Products", to: "/products", icon: "iconoir:shop-window" },
        { name: "Blog", to: "/blog", icon: "ph:pencil-simple-line" },
        { name: "Stack", to: "/stack", icon: "lucide:layers" },
        { name: "Contact", to: "/contact", icon: "carbon:send-alt" },
    ];
    const socialLinks = [
        {
            name: "Github",
            to: "https://github.com/designbyfaizi",
            icon: "mdi:github-face",
        },
        {
            name: "Twitter",
            to: "https://x.com/designbyfaizi",
            icon: "ri:twitter-x-line",
        },
        {
            name: "Instagram",
            to: "https://instagram.com/khak.csar",
            icon: "mdi:instagram",
        },
    ];

    return { navLinks, socialLinks };
});
