<template>
  <div class="flex flex-col">
    <div v-if="status === 'pending'">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script lang="ts" setup>
const { data, status, error } = await useFetch("/api/test");
</script>

<style></style>
