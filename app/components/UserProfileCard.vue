<template>
  <div class="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
    <!-- Üst Banner -->
    <div
      class="relative h-40 w-full overflow-hidden"
      :style="{
        background: user.banner
          ? `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.05) 100%), url(${user.banner_gif || user.banner}) center/cover no-repeat`
          : user.banner_color || user.accent_color
            ? `linear-gradient(135deg, ${user.banner_color || user.accent_color} 0%, ${adjustHex(user.banner_color || user.accent_color, -40)} 100%)`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }"
    >
      <a
        v-if="user.banner"
        :href="user.banner_gif || user.banner"
        target="_blank"
        rel="noopener"
        class="absolute inset-0"
      ></a>
    </div>

    <!-- Ana İçerik -->
    <div class="relative px-8 pb-8">
      <!-- Avatar + Kullanıcı Bilgileri -->
      <div class="flex flex-col md:flex-row md:items-start gap-6 -mt-16 mb-8">
        <!-- Avatar -->
        <div class="relative flex-shrink-0">
          <a :href="user.avatar_gif || user.avatar" target="_blank" rel="noopener">
            <img
              :src="user.avatar_gif || user.avatar"
              :alt="user.global_name"
              class="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl hover:scale-105 transition-transform"
            />
          </a>
          <div
            v-if="user.bot"
            class="absolute bottom-1 right-1 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg"
          >
            BOT
          </div>
        </div>

        <!-- Kullanıcı Bilgileri -->
        <div class="flex-1 pt-12 md:pt-0">
          <div class="flex flex-wrap items-center gap-3 mb-1.5">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ user.global_name }}
            </h2>
            <ClanTag :clan="user.clan" />
          </div>
          <p class="text-lg text-gray-500 dark:text-gray-400 mb-4">
            @{{ user.username }}<span v-if="user.discriminator !== '0'">#{{ user.discriminator }}</span>
          </p>
          <UserBadges :badges="user.badges" :nitro="user.nitro" />
        </div>
      </div>

      <!-- Ayırıcı Çizgi -->
      <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent mb-8"></div>

      <!-- İki Sütunlu İçerik -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Sol Sütun: Aktif İsim Plakası -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Aktif İsim Plakası
          </h3>

          <!-- İsim Plakası Kartı -->
          <div
            class="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
            :style="{
              minHeight: '120px',
              background: nameplateBanner
                ? `url(${nameplateBanner}) center/cover no-repeat`
                : user.banner_color || user.accent_color
                  ? `linear-gradient(135deg, ${user.banner_color || user.accent_color} 0%, ${adjustHex(user.banner_color || user.accent_color, -30)} 100%)`
                  : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            }"
          >
            <!-- Karartma Overlay -->
            <div class="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

            <div class="relative p-4 flex items-center gap-4">
              <img
                :src="user.avatar_gif || user.avatar"
                :alt="user.global_name"
                class="w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-lg"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-white font-bold text-lg drop-shadow-md truncate">
                    {{ user.global_name }}
                  </span>
                  <div v-if="user.clan" class="flex items-center gap-1 px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm">
                    <span v-if="user.clan.badge" class="w-4 h-4 rounded-sm object-contain">
                      <img :src="user.clan.badge" :alt="user.clan.tag" class="w-4 h-4" />
                    </span>
                    <span v-else class="text-xs">💠</span>
                    <span class="text-white/90 text-xs font-semibold">{{ user.clan.tag }}</span>
                  </div>
                </div>
                <p class="text-white/70 text-sm drop-shadow truncate">
                  @{{ user.username }}
                </p>
              </div>
            </div>
          </div>

          <!-- Açıklama -->
          <p v-if="user.bio" class="mt-3 text-sm text-gray-600 dark:text-gray-300">
            <span class="font-medium">
              {{ user.bio.length > 120 ? user.bio.slice(0, 120) + '...' : user.bio }}
            </span>
            <span v-if="user.accent_color" class="opacity-70">(Palet: {{ getPaletteName(user.accent_color) }})</span>
          </p>

          <!-- Görsel Seçenekleri -->
          <div class="mt-3 flex flex-wrap items-center gap-3">
            <a
              :href="user.banner"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              Statik Görsel
            </a>
            <a
              v-if="user.banner_gif || user.avatar_gif"
              :href="user.banner_gif || user.avatar_gif"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              Animasyonlu (WebM)
            </a>
          </div>
        </div>

        <!-- Sağ Sütun: Kullanıcı Detayları -->
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Kullanıcı Detayları
          </h3>

          <div class="space-y-1">
            <!-- Kullanıcı ID -->
            <div class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Kullanıcı ID</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-400">{{ formatId(user.id) }}</span>
                <button
                  @click="copyToClipboard(user.id)"
                  class="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all"
                  title="Kopyala"
                >
                  <svg v-if="!copiedId" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Hesap Kuruluş -->
            <div class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Hesap Kuruluş</span>
              </div>
              <span class="text-sm font-semibold text-gray-900 dark:text-white text-right">
                {{ formatRelativeDate(user.createdAtTimestamp) }}
                <span class="block text-xs text-gray-500 dark:text-gray-400 font-normal">
                  {{ formatAbsoluteDate(user.createdAt) }}
                </span>
              </span>
            </div>

            <!-- Hesap Türü -->
            <div class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-t border-gray-100 dark:border-gray-700">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Hesap Türü</span>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="user.bot ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'"
              >
                {{ user.bot ? 'Bot' : user.system ? 'Sistem' : 'Kullanıcı' }}
              </span>
            </div>

            <!-- Vurgu Rengi -->
            <div
              v-if="user.accent_color"
              class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-t border-gray-100 dark:border-gray-700 group"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5"/>
                    <circle cx="17.5" cy="10.5" r=".5"/>
                    <circle cx="8.5" cy="7.5" r=".5"/>
                    <circle cx="6.5" cy="12.5" r=".5"/>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Vurgu Rengi</span>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="w-5 h-5 rounded shadow-inner border border-gray-200 dark:border-gray-600"
                  :style="{ backgroundColor: user.accent_color }"
                ></div>
                <span class="font-mono text-sm font-semibold" :style="{ color: user.accent_color }">
                  {{ user.accent_color?.toUpperCase() }}
                </span>
                <button
                  @click="copyToClipboard(user.accent_color || '')"
                  class="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all"
                  title="Kopyala"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Doğrulanmış Hesap -->
            <div
              v-if="user.verified"
              class="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-t border-gray-100 dark:border-gray-700"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-600 dark:text-gray-300">Doğrulanmış</span>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                E-posta Doğrulandı
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ortak Sunucular -->
      <div v-if="guilds && guilds.length" class="mb-8">
        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
          Ortak Sunucular ({{ guilds.length }})
        </h3>
        <div class="space-y-3">
          <GuildCard v-for="guild in guilds" :key="guild.id" :guild="guild" />
        </div>
      </div>

      <!-- Alt Butonlar -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        <!-- Sol Butonlar -->
        <div class="flex items-center gap-2">
          <button
            class="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all"
            title="Profil Linkini Paylaş"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </button>
        </div>

        <!-- Sağ Butonlar -->
        <div class="flex items-center gap-2">
          <button
            @click="copyToClipboard(user.id)"
            class="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all"
            title="ID'yi Kopyala"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </button>
          <button
            class="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all"
            title="Kullanıcıyı Raporla"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </button>
          <button
            class="p-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            title="Detaylı İncele"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button
            @click="$emit('close')"
            class="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all"
            title="Kapat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import UserBadges from "./UserBadges.vue";
import ClanTag from "./ClanTag.vue";
import GuildCard from "./GuildCard.vue";

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

const props = defineProps<{
  user: UserData;
  guilds?: Guild[];
}>();

defineEmits(["close"]);

const copiedId = ref(false);

const nameplateBanner = computed(() => props.user.banner_gif || props.user.banner);

function adjustHex(hex: string, percent: number): string {
  if (!hex) return "#333333";
  const cleanHex = hex.replace("#", "");
  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(Math.min((num >> 16) + amt, 255), 0);
  const G = Math.max(Math.min(((num >> 8) & 0x00ff) + amt, 255), 0);
  const B = Math.max(Math.min((num & 0x0000ff) + amt, 255), 0);
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
}

function getPaletteName(hex: string): string {
  const palettes: Record<string, string> = {
    "18191c": "Black",
    "ffffff": "White",
    "eb459e": "Fuchsia",
    "f47b67": "Quartz",
    "faa61a": "Citrus",
    "fee75c": "Sunflower",
    "57f287": "Green",
    "3ba55c": "Dark Green",
    "00b0f4": "Blue",
    "5865f2": "Blurple",
  };
  return palettes[hex.toLowerCase()] || "Özel";
}

function formatId(id: string): string {
  if (id.length > 8) {
    const first = id.slice(0, 4);
    const last = id.slice(-4);
    return `${first} ${id.slice(4, -4).match(/.{1,4}/g)?.join(' ') || ''} ${last}`.trim();
  }
  return id;
}

function formatRelativeDate(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} yıl önce`;
  if (months > 0) return `${months} ay önce`;
  if (days > 0) return `${days} gün önce`;
  if (hours > 0) return `${hours} saat önce`;
  if (minutes > 0) return `${minutes} dakika önce`;
  return `${seconds} saniye önce`;
}

function formatAbsoluteDate(isoString: string): string {
  return new Date(isoString).toLocaleString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    copiedId.value = true;
    setTimeout(() => {
      copiedId.value = false;
    }, 2000);
  } catch (err) {
    console.error("Kopyalama hatası:", err);
  }
}
</script>
