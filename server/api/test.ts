export default defineEventHandler(async () => {
    const { testApiCall } = useNotion();
    return await testApiCall();
})