<template>
  <div
    v-if="clan"
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-500/10 border border-gray-200 dark:border-gray-700 transition-all hover:bg-gray-500/20 cursor-pointer"
  >
    <img
      v-if="clan.badge"
      :src="clan.badge"
      :alt="clan.tag"
      class="w-5 h-5 object-contain rounded"
      loading="lazy"
    />
    <div v-else class="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
      <span class="text-white text-xs font-bold">💠</span>
    </div>
    <span class="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-tight">
      {{ clan.tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Clan {
  tag: string;
  badge: string | null;
  guild_id: string | null;
}

defineProps<{
  clan: Clan | null;
}>();
</script>
