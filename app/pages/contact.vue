<template>
  <main class="content-grid">
    <GeneralHeroSection title="Get in touch">
      <p>Have a question or an idea? Let me know!</p>
    </GeneralHeroSection>
    <section>
      <div class="tabs flex items-center w-fit gap-4 bg-card p-2 rounded-xl">
        <button
          @click="activeTab = tab"
          v-for="tab in tabs"
          :key="tab.name"
          class="px-4 py-2 rounded-lg hover:bg-card relative"
        >
          <span class="relative z-2">
            {{ tab.name }}
          </span>
          <motion.span
            v-if="tab.name === activeTab?.name"
            :class="[`absolute inset-0 z-1 rounded-lg`, tab.class]"
            layout-id="contact-form-underline"
          ></motion.span>
        </button>
      </div>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-4 max-w-sm *:p-2">
        <input
          name="name"
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          placeholder="Name"
        />
        <input
          name="email"
          v-model="email"
          v-bind="emailAttrs"
          type="text"
          placeholder="Email"
        />
        <textarea
          name="message"
          v-model="message"
          v-bind="messageAttrs"
          placeholder="Message"
        />
        <Button type="submit" class="w-fit">Submit</Button>
      </form>
      <pre>values: {{ values }}</pre>
      <pre>errors: {{ errors }}</pre>
    </section>
  </main>
</template>

<script lang="ts" setup>
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

const { handleSubmit, resetForm, resetField, meta, defineField, values, errors } = useForm({
  validationSchema: formSchema,
});

const [name, nameAttrs] = defineField("name", state => ({validateOnModelUpdate: state.errors.length > 0}));
const [email, emailAttrs] = defineField("email", state => ({validateOnModelUpdate: state.errors.length > 0}));
const [message, messageAttrs] = defineField("message", state => ({validateOnModelUpdate: state.errors.length > 0}));

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted! ", values);
});
</script>

<style>
input, textarea {
  background-color: oklch(var(--card));
  color: oklch(var(--card-foreground))
}
</style>
