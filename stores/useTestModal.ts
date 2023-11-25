export const useTestModal = defineStore("testModal", () => {
    const isOpen = useState("isOpen", () => false);

    const openModal = () => {
        isOpen.value = true;
    };

    const closeModal = () => {
        isOpen.value = false;
    };

    const switchModal = () => {
        isOpen.value = !isOpen.value;
    };
    return { isOpen, openModal, closeModal, switchModal };
});
