export const useProjects = defineStore("projects", () => {
    const projects: Project[] = [
        {
            id: 1,
            name: "Mano Animation Studios",
            description:
                "A website for Mano Animation Studios and their upcoming movie: The Glassworker",
            to: "/projects",
            client: "Mano Animation Studios",
            niche: ["Wordpress"],
            duration: "2 months",
            year: 2022,
            logo: "https://manoanimationstudios.com/wp-content/uploads/2022/04/mano-cat-white.svg",
            richInfo: "Lorem Ipsum"
        },
    ];
    return { projects };
});
