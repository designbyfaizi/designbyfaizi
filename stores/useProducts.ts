export const useProducts = defineStore("products", () => {
    const products: Product[] = [
        {
            id: 1,
            name: "FlatGPT",
            description: "A ChatGPT clone that I made in one day.",
            to: "/products",
            niche: ["AI", "Next 14"],
            duration: "1 day",
            year: 2023,
            logo: "https://www.9mm.cl/wp-content/uploads/2023/01/openai-logo.png",
            price: "Free",
            richInfo:"Lorem Ipsum"
        },
    ];
    return { products };
});
