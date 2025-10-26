type Body = {
  formData: {
    purpose: string;
    name: string;
    email: string;
    message: string;
  };
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const formData = new FormData();

  for (const key in body.formData) {
    // @ts-ignore
    formData.append(key, body.formData[key]);
  }

  try {
    const res = await $fetch(config.public.google_sheets_url, {
      method: "POST",
      body: formData,
    });

    console.log({ res });

  } catch (error: any) {
    console.error("Error submitting form:", error);
    throw createError({
        statusCode: 400,
        statusMessage: "Message could not be sent."
    })
  }
});
