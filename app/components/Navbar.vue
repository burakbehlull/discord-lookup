<template>
  <div class="navbar bg-base-100 shadow-md px-4">
    <div class="flex-1">
      <a class="text-xl font-bold">Discord Lookup</a>
    </div>

    <div class="flex justify-center items-center gap-6">
	  <a href="https://github.com/burakbehlull/discord-lookup" target="_blank" rel="noopener">
		<VscGithubAlt  />
	  </a>
      <button class="btn btn-ghost" @click="toggleTheme">
        <svg
          v-if="theme === 'light'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 3v1m0 16v1m8.485-8.485h1M3.515 12.515h1M18.364 5.636l.707.707M4.929 19.071l.707.707M16.95 16.95l.707.707M6.343 6.343l.707.707M12 5a7 7 0 107 7h-7z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { BsGithub } from "vue-icons-plus/bs";
import { VscGithubAlt } from "vue-icons-plus/vsc";
import { useTheme } from "../composables/useTheme";

const { theme, toggleTheme } = useTheme();
</script>
