export default defineEventHandler(async (): Promise<PayloadResponse<Client>> => {
    const config = useRuntimeConfig();
    const { api_url, api_key } = config;

    const response: PayloadResponse<Client> = await $fetch(`${api_url}/clients`);
    return response;
})