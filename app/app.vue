<template>
  <div class="min-h-screen bg-base-200">
    <Navbar />

    <div class="flex flex-col items-center justify-center py-10">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>
