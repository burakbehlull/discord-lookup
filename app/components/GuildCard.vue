<template>
  <div
    class="flex items-center gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-lg transition-all cursor-pointer group"
  >
    <div class="relative flex-shrink-0">
      <img
        v-if="guild.icon"
        :src="guild.icon"
        :alt="guild.name"
        class="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform"
        loading="lazy"
      />
      <div
        v-else
        class="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-md"
        :style="{ backgroundColor: guild.accent_color || '#5865F2' }"
      >
        {{ guild.name.charAt(0).toUpperCase() }}
      </div>
      <div
        v-if="guild.owner"
        class="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs shadow-lg"
        title="Sunucu Sahibi"
      >
        👑
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h4 class="font-bold text-gray-900 dark:text-white truncate">
          {{ guild.name }}
        </h4>
        <ClanTag v-if="guild.clan" :clan="guild.clan" />
      </div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
        <span class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          {{ formatNumber(guild.member_count) }} Üye
        </span>
        <span class="flex items-center gap-1 text-green-600 dark:text-green-400">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          {{ formatNumber(guild.online_count) }} Çevrimiçi
        </span>
        <span v-if="guild.boost_count > 0" class="flex items-center gap-1 text-pink-600 dark:text-pink-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.224 3.712a1 1 0 0 0-1.248-.47L9 5.845V12.5a.75.75 0 0 1-1.5 0V6.456L3.024 8.76a1 1 0 1 0 .776 1.837L7.5 9.095V12.5a2.25 2.25 0 0 0 4.5 0V7.344l5.776-2.61a1 1 0 0 0 .47-1.248z"/>
            <path d="M4.224 13.712a1 1 0 0 0-1.248-.47A37.045 37.045 0 0 0 1 18.5c0 2.304 1.107 4.1 2.682 5.197.632.442 1.516.3 2.058-.327l1.732-2a1 1 0 0 0-.234-1.551 4.402 4.402 0 0 1-1.634-1.634 1 1 0 0 0-1.38-.473z"/>
            <path d="M19.776 13.712a1 1 0 0 1 1.248-.47c.899.39 1.892 1.056 2.898 2.065A1 1 0 0 1 23 16.5v6a1 1 0 0 1-1.707.707L18 19.914V19a2 2 0 0 0-2-2h-3.05a1 1 0 0 1-.95-1.312L13 14h3a1 1 0 0 0 .894-.553l.67-1.34a1 1 0 0 1 2.212.605z"/>
          </svg>
          {{ guild.boost_count }} boosts
        </span>
      </div>
    </div>

    <button
      class="flex-shrink-0 p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-gray-600 dark:text-gray-300"
      title="Detayları Göster"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import ClanTag from "./ClanTag.vue";

interface GuildClan {
  tag: string;
  badge: string | null;
  guild_id: string | null;
}

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  description: string | null;
  member_count: number;
  online_count: number;
  boost_count: number;
  accent_color: string | null;
  owner: boolean;
  clan?: GuildClan | null;
}

defineProps<{
  guild: Guild;
}>();

function formatNumber(num: number): string {
  return num.toLocaleString("tr-TR");
}
</script>
