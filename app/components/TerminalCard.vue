<template>
  <section class="bg-ink py-16 text-paper md:py-28">
    <div class="sheet">
      <div class="slug flex items-baseline gap-3 text-paper">
        <span class="text-primary">Sheet 06</span>
        <span class="h-px flex-1 bg-paper/25" />
        <span>{{ site.terminal.title }}</span>
      </div>
      <div class="mt-10 grid gap-8 md:mt-16 md:grid-cols-12">
        <div class="md:col-span-4">
          <p class="display text-6xl md:text-7xl lg:text-8xl">{{ site.terminal.title }}</p>
          <p class="mt-5 font-serif text-2xl leading-snug">{{ site.terminal.note }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <button
              v-for="command in suggestions"
              :key="command"
              type="button"
              class="slug border border-paper/40 px-2 py-1 normal-case transition-colors hover:border-primary hover:bg-primary hover:text-ink"
              @click="run(command)"
            >
              {{ command }}
            </button>
          </div>
        </div>
        <div class="flex h-[30rem] flex-col border border-paper/30 md:col-span-8 md:h-[32rem]" @click="focusInput">
          <div class="slug flex items-center justify-between border-b border-paper/30 px-3 py-2 normal-case">
            <span>fish — designbyfaizi@world</span>
            <span class="size-2 bg-primary" />
          </div>
          <div ref="output" class="no-scrollbar flex-1 overflow-y-auto p-3 font-mono text-[11px] leading-5 md:p-5 md:text-sm md:leading-6">
            <div v-for="(line, index) in lines" :key="index">
              <p v-if="line.kind === 'in'" class="break-all"><span class="text-primary">λ</span> {{ line.text }}</p>
              <pre v-else class="font-mono break-words whitespace-pre-wrap text-paper/85">{{ line.text }}</pre>
            </div>
          </div>
          <form class="flex items-center gap-2 border-t border-paper/30 px-3 py-2 font-mono text-sm md:px-5" @submit.prevent="submit">
            <span class="text-primary">λ</span>
            <input
              ref="field"
              v-model="typed"
              aria-label="Terminal command"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              class="w-full bg-transparent caret-primary outline-none"
              placeholder="type help"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProjectCollectionItem, SkillCollectionItem } from "@nuxt/content";

const props = defineProps<{
  categories: SkillCollectionItem[];
  projects: ProjectCollectionItem[];
}>();

const site = useSite();
const output = useTemplateRef("output");
const field = useTemplateRef("field");

type Line = { kind: "in" | "out"; text: string };

const suggestions = ["whoami", "skills", "projects", "rust", "sudo hire-me", "clear"];

const fetchOutput = () => {
  const t = site.value.terminal;
  return `           .
          .c.          designbyfaizi@world
         .ccc.        ─────────────────────
        .lllll.        OS      ${t.os}
       ..;'olll.       Kernel  ${t.kernel}
      .dolllcccl.      WM      ${t.wm}
     .lcc'   'ccc.     Shell   ${t.shell}
    .ccc'     'cc:.    Uptime  ${t.uptime}
   .cccc'     'c:;..   CPU     ${t.cpu}
  ."'             '".

${t.motto}`;
};

const lines = ref<Line[]>([
  { kind: "in", text: "fetch" },
  { kind: "out", text: fetchOutput() },
]);
const typed = ref("");

const pages: Record<string, string> = {
  home: "/",
  projects: "/projects",
  creations: "/creations",
  skills: "/skills",
  blog: "/blog",
  art: "/art",
  contact: "/contact",
};

const go = (path: string, text: string) => {
  setTimeout(() => navigateTo(path), 700);
  return text;
};

const respond = (input: string): string | null => {
  const [name = "", ...rest] = input.split(/\s+/);
  const argument = rest.join(" ");

  switch (name.toLowerCase()) {
    case "help":
      return "whoami  fetch  skills  projects  art  rust\ncontact  ls  cd <page>  echo <text>  clear\nsudo hire-me";
    case "whoami":
      return `${site.value.name}, also known as ${site.value.nickname}. ${site.value.bio}`;
    case "fetch":
    case "neofetch":
    case "fastfetch":
      return fetchOutput();
    case "skills":
      return props.categories.map((c) => `${c.name} (${c.skills.length})`).join("\n");
    case "projects":
      return props.projects.map((p) => `${p.title}  ${p.url}`).join("\n");
    case "art":
      return go("/art", "Opening the ink drawer...");
    case "rust":
      return "   Compiling faizi v0.1.0\n    Finished release [optimized]\n🦀 Ferris says hallo.";
    case "contact":
      return `${site.value.email}\nOr type: cd contact`;
    case "ls":
      return Object.keys(pages).join("  ");
    case "cd":
      return pages[argument]
        ? go(pages[argument]!, `Going to ${argument}...`)
        : `cd: no such page: ${argument || "(nothing)"}`;
    case "echo":
      return argument;
    case "sudo":
      return argument.startsWith("hire-me") || argument.startsWith("hire")
        ? go("/contact", "[sudo] permission granted. Opening a job ticket...")
        : "Nice try. This incident will be reported to Ferris.";
    case "":
      return null;
    default:
      return `fish: Unknown command: ${name}\nTry help.`;
  }
};

const run = async (input: string) => {
  const command = input.trim();
  if (command.toLowerCase() === "clear") {
    lines.value = [];
    return;
  }
  lines.value.push({ kind: "in", text: command });
  const reply = respond(command);
  if (reply !== null) lines.value.push({ kind: "out", text: reply });
  await nextTick();
  output.value?.scrollTo({ top: output.value.scrollHeight, behavior: "smooth" });
};

const submit = () => {
  run(typed.value);
  typed.value = "";
};

const focusInput = () => {
  if (window.getSelection()?.isCollapsed) field.value?.focus({ preventScroll: true });
};
</script>
