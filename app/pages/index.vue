<template>
  <div class="min-h-screen bg-base-200 relative overflow-hidden">
    <!-- Arka Plan Deseni -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
         style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 24px 24px;">
    </div>

    <div class="relative z-10 flex flex-col items-center justify-start min-h-screen py-16 px-4">
      <!-- Logo + Başlık -->
      <div class="text-center mb-8 animate-fade-in">
        <div class="flex items-center justify-center gap-2 mb-6">
          <div class="w-9 h-9 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 text-white dark:text-gray-900" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
            </svg>
          </div>
          <span class="font-mono text-sm font-semibold tracking-[0.2em] text-gray-500 dark:text-gray-400">
            DISCORD LOOKUP
          </span>
        </div>

        <h1 class="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
          Özel grupların içinde kimlerin olduğunu gör!
        </h1>
      </div>

      <!-- Arama Inputu -->
      <div class="w-full max-w-2xl mb-6 animate-slide-up">
        <div class="relative group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-300"></div>
          <div class="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="flex items-center pl-5 pr-3 py-4 border-r border-gray-100 dark:border-gray-700">
              <span class="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-500 dark:text-gray-300 tracking-wider">
                ID
              </span>
            </div>
            <input
              v-model="userId"
              type="text"
              placeholder="Kullanıcı ID girin..."
              class="flex-1 px-4 py-4 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
              @keyup.enter="lookupUser"
            />
            <button
              class="flex items-center gap-2 mr-2 px-3 py-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              @click="pasteFromClipboard"
              title="Panodan Yapıştır"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
            </button>
            <button
              @click="lookupUser"
              :disabled="loading || !userId.trim()"
              class="m-2 p-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
              <svg v-else class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Açıklama -->
      <p v-if="!user && !loading" class="text-sm text-gray-500 dark:text-gray-400 text-center mb-8 animate-fade-in">
        Kullanıcı ID ile <span class="font-medium text-gray-700 dark:text-gray-300 underline decoration-dotted">profil, rozet ve etkinlik işaretlerine</span> anında ulaşın — giriş veya bot tokeni gerekmez.
      </p>

      <!-- Hata -->
      <div
        v-if="error"
        class="w-full max-w-2xl p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-center mb-8 animate-shake"
      >
        <div class="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span class="font-medium">{{ error }}</span>
        </div>
      </div>

      <!-- Yükleniyor -->
      <div v-if="loading && !error" class="flex flex-col items-center gap-4 py-16 animate-pulse">
        <div class="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-white animate-spin"></div>
        <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">Kullanıcı bilgileri alınıyor...</p>
      </div>

      <!-- Profil Kartı -->
      <div
        v-if="user && !loading"
        class="w-full flex justify-center py-6 animate-slide-up-slow"
      >
        <UserProfileCard :user="user" :guilds="guilds" @close="resetSearch" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

import UserProfileCard from "../components/UserProfileCard.vue";

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

interface Clan {
  tag: string;
  badge: string | null;
  guild_id: string | null;
}

interface UserData {
  id: string;
  username: string;
  global_name: string;
  display_name: string;
  discriminator: string;
  avatar: string;
  avatar_gif: string | null;
  banner: string | null;
  banner_gif: string | null;
  banner_color: string | null;
  accent_color: string | null;
  bio: string;
  locale: string | null;
  verified: boolean;
  bot: boolean;
  system: boolean;
  mfa_enabled: boolean;
  badges: Badge[];
  nitro: Nitro;
  clan: Clan | null;
  createdAt: string;
  createdAtTimestamp: number;
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
  clan?: Clan | null;
}

const userId = ref("");
const user = ref<UserData | null>(null);
const guilds = ref<Guild[]>([]);
const loading = ref(false);
const error = ref("");

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  if (idParam) {
    userId.value = idParam;
    lookupUser();
  }
});

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    userId.value = text.trim();
  } catch (err) {
    console.error("Pano hatası:", err);
  }
}

function resetSearch() {
  user.value = null;
  guilds.value = [];
  error.value = "";
}

async function lookupUser() {
  const id = userId.value.trim();
  if (!id) return;

  resetSearch();
  loading.value = true;

  if (window.history.replaceState) {
    const url = new URL(window.location.href);
    url.searchParams.set("id", id);
    window.history.replaceState({}, "", url.toString());
  }

  try {
    const res = await axios.get(`/api/user/${id}`);
    if (res.data.error) throw new Error(res.data.error);
    user.value = res.data;

    try {
      const guildsRes = await axios.get(`/api/user/${id}/guilds`);
      if (guildsRes.data && !guildsRes.data.error) {
        guilds.value = guildsRes.data;
      }
    } catch (_) {
      guilds.value = [];
    }
  } catch (err: any) {
    error.value = err.message || "Bir hata oluştu.";
  } finally {
    loading.value = false;
  }
}

useHead({
  title: "Discord Lookup",
  meta: [
    { name: "description", content: "Discord kullanıcılarını, rozetlerini, guildlarını ve daha fazlasını anında keşfedin." },
    { name: "author", content: "@burakbehlull" },
    { property: "og:title", content: "Discord Lookup" },
    { property: "og:description", content: "Discord kullanıcılarını, rozetlerini, guildlarını ve daha fazlasını anında keşfedin." },
    { property: "og:type", content: "website" },
  ],
});
</script>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up-slow {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out both;
}

.animate-slide-up {
  animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 0.1s;
}

.animate-slide-up-slow {
  animation: slide-up-slow 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-shake {
  animation: shake 0.4s ease-in-out both;
}
</style>
