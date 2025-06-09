<template>
  <main class="content-grid">
    <GeneralHeroSection title="Get in touch">
      <p>{{ description }}</p>
    </GeneralHeroSection>
    <section>
      <div class="tabs flex items-center w-fit gap-4 rounded-xl">
        <button
          @click="activeTab = tab"
          v-for="tab in tabs"
          :key="tab.name"
          class="px-4 py-2 rounded-lg hover:bg-accent relative"
          :class="activeTab?.name === tab.name && 'text-white'"
        >
          <span class="relative z-2 font-medium">
            {{ tab.name }}
          </span>
          <motion.span
            v-if="tab.name === activeTab?.name"
            :class="[`absolute inset-0 z-1 rounded-lg`, tab.class]"
            layout-id="contact-form-underline"
          ></motion.span>
        </button>
      </div>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-4 max-w-sm">
        <input
          name="name"
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          placeholder="Name"
          required
        />
        <input
          name="email"
          v-model="email"
          v-bind="emailAttrs"
          type="text"
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          v-model="message"
          v-bind="messageAttrs"
          placeholder="Message"
          required
        />
        <pre
          v-if="errors.email || errors.message || errors.name"
          class="text-red-500 p-2 text-xs bg-foreground text-background rounded-xl overflow-x-scroll"
        >
errors: {{ errors }}
      </pre
        >
        <Button
          v-else
          type="submit"
          class="w-fit disabled:bg-stone-200 disabled:text-stone-400"
          :disabled="isSubmitting"
        >
          Submit
        </Button>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { motion } from "motion-v";

const schema = z.object({
  name: z.string().min(2).max(40),
  email: z.string().email(),
  message: z.string().min(5).max(300),
});
type Schema = z.infer<typeof schema>;
const formSchema = toTypedSchema(schema);
const tabs = [
  {
    name: "Say hello",
    class: "bg-primary",
  },
  {
    name: "Idea",
    class: "bg-cyan-500",
  },
  {
    name: "Sponsor",
    class: "bg-green-500",
  },
];
const activeTab = useState("active_tab", () => tabs[0]);

const {
  handleSubmit,
  resetForm,
  resetField,
  meta,
  defineField,
  values,
  errors,
  isSubmitting,
} = useForm({
  validationSchema: formSchema,
});

const [name, nameAttrs] = defineField("name", (state) => ({
  validateOnModelUpdate: state.errors.length > 0,
}));
const [email, emailAttrs] = defineField("email", (state) => ({
  validateOnModelUpdate: state.errors.length > 0,
}));
const [message, messageAttrs] = defineField("message", (state) => ({
  validateOnModelUpdate: state.errors.length > 0,
}));

const finalValues = computed(() => ({
  purpose: activeTab?.value?.name.toLowerCase(),
  name: name.value,
  email: email.value,
  message: message.value,
}));

const onSubmit = handleSubmit(async (values) => {
  try {
    const url = config.public.google_sheets_url;
    const res = await $fetch(url, {
      method: "POST",
      body: finalValues.value,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    alert("Form Submitted! Thank you for reaching out!");
    resetForm();
  }
});

const title = "Contact - Design By Faizi";
const description = "Have a question or an idea? Let me know!";

useSeoMeta({
  title,
  description,
});
</script>

<style>
input,
textarea {
  background-color: oklch(var(--accent));
  color: oklch(var(--card-foreground));
  border-radius: 8px;
  padding: 0.6rem 0.6rem;
  font-weight: 600;

  /* Focused Styles */
  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px oklch(var(--primary));
    border-color: oklch(var(--primary));
  }
}
</style>
