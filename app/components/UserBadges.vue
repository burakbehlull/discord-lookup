<template>
  <div v-if="badges && badges.length" class="flex flex-wrap items-center gap-1.5">
    <div
      v-for="badge in badges"
      :key="badge.id"
      class="relative group"
    >
      <img
        :src="badge.icon"
        :alt="badge.name"
        class="w-7 h-7 object-contain drop-shadow-sm transition-transform hover:scale-110"
        loading="lazy"
      />
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
        <span class="font-medium" :style="{ color: badge.color }">{{ badge.name }}</span>
        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
    <div v-if="nitro && nitro.subscription" class="relative group">
      <img
        v-if="nitro.icon"
        :src="nitro.icon"
        :alt="nitro.name"
        class="w-7 h-7 object-contain drop-shadow-sm transition-transform hover:scale-110"
        loading="lazy"
      />
      <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
        <span class="font-medium text-pink-500">{{ nitro.name }}</span>
        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  </div>
  <div v-else class="text-sm text-gray-500 italic">
    Kullanıcının rozeti yok
  </div>
</template>

<script setup lang="ts">
interface Badge {
  id: number;
  name: string;
  icon: string;
  color: string;
}

interface Nitro {
  level: number;
  name: string;
  icon: string | null;
  subscription: boolean;
}

defineProps<{
  badges: Badge[];
  nitro?: Nitro | null;
}>();
</script>
