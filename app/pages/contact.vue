<template>
  <main>
    <PageHero :title="site.contact.heading" label="Say hallo" :plate="8">
      <RiseText :text="site.contact.intro" class="font-serif text-2xl leading-snug md:text-3xl" :delay="0.4" />
    </PageHero>

    <section class="sheet py-12 md:py-20">
      <motion.div
        data-enter
        class="grid border border-foreground bg-card md:grid-cols-[minmax(0,2fr)_18px_minmax(0,1fr)]"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ ...gentle, delay: 0.3 }"
      >
        <AnimatePresence mode="wait" :initial="false">
          <motion.div
            v-if="sentTo"
            key="sent"
            class="flex min-h-[28rem] flex-col items-start justify-center gap-5 p-6 md:p-12"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
          >
            <motion.p
              class="display border-4 border-primary p-3 text-6xl text-rose-ink md:text-8xl"
              :initial="{ scale: 2.4, rotate: 10, opacity: 0 }"
              :animate="{ scale: 1, rotate: -5, opacity: 1 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 16 }"
            >
              Received
            </motion.p>
            <p class="font-serif text-2xl">Thank you, {{ sentTo }}! I'll reply by email soon.</p>
            <Button variant="outline" @click="sentTo = ''">Fill another ticket</Button>
          </motion.div>

          <motion.form
            v-else
            key="form"
            class="flex flex-col gap-6 p-5 md:p-10"
            :exit="{ opacity: 0, y: -10 }"
            :transition="{ duration: 0.15 }"
            @submit.prevent="send"
          >
            <fieldset>
              <legend class="slug text-muted-foreground">Kind of job</legend>
              <div class="mt-2 flex flex-wrap gap-1">
                <button
                  v-for="job in jobs"
                  :key="job"
                  type="button"
                  :class="['slug relative px-4 py-3', activeJob === job && 'text-ink']"
                  :disabled="isSending"
                  @click="activeJob = job"
                >
                  <motion.span
                    v-if="activeJob === job"
                    layout-id="job-kind"
                    class="absolute inset-0 bg-primary"
                    :transition="snappy"
                  />
                  <span class="relative">{{ job }}</span>
                </button>
              </div>
            </fieldset>

            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <Label for="ticket-name" class="slug text-muted-foreground">Name</Label>
                <Input id="ticket-name" v-model="form.name" name="name" autocomplete="name" required :class="fieldClass" />
              </div>
              <div>
                <Label for="ticket-email" class="slug text-muted-foreground">Email</Label>
                <Input id="ticket-email" v-model="form.email" name="email" type="email" autocomplete="email" required :class="fieldClass" />
              </div>
            </div>
            <div>
              <Label for="ticket-message" class="slug text-muted-foreground">Message</Label>
              <Textarea id="ticket-message" v-model="form.message" name="message" required :class="[fieldClass, 'min-h-44 resize-y [field-sizing:fixed]']" />
            </div>
            <input
              v-model="form.website"
              name="website"
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="absolute left-[-9999px] size-px opacity-0"
            />
            <div>
              <Button type="submit" variant="rose" size="lg" :disabled="!isReady || isSending">
                {{ isSending ? "Sending..." : "Send to press" }}
              </Button>
            </div>
          </motion.form>
        </AnimatePresence>

        <div class="perforated hidden border-x border-dashed md:block" aria-hidden="true" />

        <aside class="flex flex-col gap-5 border-t border-dashed p-5 md:border-t-0 md:p-8" aria-label="Your ticket">
          <p class="slug flex justify-between"><span>Ticket stub</span><span class="text-rose-ink">No. {{ ticketNumber }}</span></p>
          <dl class="flex flex-col gap-4">
            <div v-for="row in stub" :key="row.label" class="border-b pb-3">
              <dt class="slug text-muted-foreground">{{ row.label }}</dt>
              <dd class="mt-1 min-h-7 truncate font-serif text-xl">{{ row.value }}</dd>
            </div>
          </dl>
          <div class="mt-auto">
            <p class="slug text-muted-foreground">Rather write yourself?</p>
            <a :href="`mailto:${site.email}`" class="slug mt-1 inline-block normal-case underline underline-offset-4 hover:text-rose-ink">
              {{ site.email }}
            </a>
          </div>
        </aside>
      </motion.div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { toast } from "vue-sonner";
import { contactSchema } from "#shared/contact";
import { gentle, snappy } from "@/lib/motion";

const site = useSite();

const fieldClass =
  "mt-1 h-auto rounded-none border-0 border-b border-foreground bg-transparent px-0 py-2 font-serif text-xl focus-visible:border-primary focus-visible:ring-0 md:text-xl dark:bg-transparent";

const jobs = ["Job offer", "Project", "Say hello"] as const;
const activeJob = ref<(typeof jobs)[number]>(jobs[0]);

const form = reactive({ name: "", email: "", message: "", website: "" });
const isSending = ref(false);
const sentTo = ref("");
const isReady = computed(() => form.name && form.email && form.message);

const ticketNumber = ref("0000");
onMounted(() => {
  ticketNumber.value = String(Date.now() % 10000).padStart(4, "0");
});

const stub = computed(() => [
  { label: "Job", value: activeJob.value },
  { label: "For", value: form.name },
  { label: "Reply to", value: form.email },
  { label: "Length", value: form.message ? `${form.message.trim().split(/\s+/).length} words` : "" },
]);

// Used when the server can't send email, so a message is never lost.
const openEmailApp = (name: string, email: string, message: string) => {
  const subject = encodeURIComponent(`${activeJob.value} from ${name}`);
  const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
  window.location.href = `mailto:${site.value.email}?subject=${subject}&body=${body}`;
};

const send = async () => {
  const parsed = contactSchema.safeParse({ ...form, purpose: activeJob.value });
  if (!parsed.success) {
    toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
    return;
  }

  isSending.value = true;
  try {
    await $fetch("/api/contact", { method: "POST", body: parsed.data });
    sentTo.value = parsed.data.name.split(" ")[0]!;
    Object.assign(form, { name: "", email: "", message: "", website: "" });
  } catch (error: any) {
    if (error?.statusCode === 400 || error?.statusCode === 429) {
      toast.error(error.statusMessage);
    } else {
      toast.info("Opening your email app so your message still reaches me.");
      openEmailApp(parsed.data.name, parsed.data.email, parsed.data.message);
    }
  } finally {
    isSending.value = false;
  }
};

usePageSeo("Contact - Design By Faizi", site.value.contact.intro);
</script>
