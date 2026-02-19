<template>
  <section class="pt-[100px] space-y-4" ref="scope">
    <h1 class="text-4xl font-bold text-center">My Clients</h1>
    <ul
      class="grid grid-cols-6 gap-4 relative mx-auto"
    >
      <li
        v-for="client in clientData"
        :key="client.name"
        :title="client.name"
        class="p-8 rounded-xl bg-accent w-full flex items-center justify-center col-span-3 md:col-span-2"
      >
      <div class="w-[72px] h-[72px] bg-neutral-800 rounded-xl p-2">
        <NuxtImg
          :src="client.logo.src"
          :alt="client.logo.alt"
          class="max-h-[64px] group-hover:hidden rounded-lg"
        />
      </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const { data: clientData, status, error } = await useAsyncData("clients", () =>
  queryCollection("client").order("date", "ASC").all()
);

console.log({ clientData: clientData.value });
const scope = ref(null);

watch(error, () => {
  if (error.value) {
    console.error("Error fetching client data:", error.value);
  }
});
</script>

<style></style>
