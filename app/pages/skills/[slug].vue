<template>
  <div class="flex flex-col items-center content-grid">
    <div v-if="status === 'pending' && !data" class="mx-auto"><Loader /></div>
    <div v-else-if="error && !data">{{ error.message }}</div>
    <div v-else class="flex flex-col gap-4 w-full">
      <GeneralHeroSection
        :title="data?.name || ''"
        class="relative lg:!flex-row !justify-start !min-h-auto !h-auto"
      >
        <template #pre>
          <Button :as="(nuxtLink as string)" to="/skills" variant="soft" size="sm">
            <Icon
              name="material-symbols:arrow-back-ios-new-rounded"
              class="size-[16px] -ms-1"
            />
            <span> Back </span>
          </Button>
        </template>
      </GeneralHeroSection>
      <ul class="flex flex-col divide-y divide-border">
        <li v-for="skill in data?.skills" class="py-2">
          {{ skill?.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

const { params } = useRoute();
console.log(params.slug);
const { data, status, error } = await useFetch(
  `/api/payload/skill-categories/${params.slug}`
);

const title = `${data?.value?.name} | Design By Faizi`;
const nuxtLink = resolveComponent("NuxtLink");

const goBack = () => {
  if (!history) return;
  router.push("/skills");
};
</script>

<style></style>
