<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-center">🔍 Discord Lookup</h2>
        <input
          v-model="userId"
          type="text"
          placeholder="Kullanıcı ID gir"
          class="input input-bordered w-full"
        />
        <button class="btn btn-primary mt-2" @click="lookupUser" :disabled="loading">
          {{ loading ? 'Yükleniyor...' : 'Ara' }}
        </button>

        <div v-if="error" class="text-error mt-2">{{ error }}</div>

        <div v-if="user" class="mt-4">
          <div class="flex flex-col items-center">
            <img
              :src="user.banner || '/default_banner.png'"
              alt="banner"
              class="w-full rounded-xl object-cover h-24"
            />
            <img
              :src="user.avatar"
              alt="avatar"
              class="rounded-full w-24 h-24 -mt-12 border-4 border-base-100"
            />
            <h3 class="text-lg font-bold mt-2">{{ user.username }}</h3>
            <p class="text-sm opacity-70">#{{ user.discriminator }}</p>
            <p class="mt-1 text-sm">
              <b>Oluşturulma:</b> {{ formatDate(user.createdAt) }}
            </p>
            <p><b>Nitro:</b> {{ user.premium_type ? 'Var' : 'Yok' }}</p>

            <div class="mt-2">
              <b>Rozetler:</b>
              <div v-if="user.badges.length" class="flex flex-wrap justify-center gap-2 mt-1">
                <span v-for="b in user.badges" :key="b" class="badge badge-accent">{{ b }}</span>
              </div>
              <div v-else class="text-sm opacity-70">Rozet yok</div>
            </div>

            <div v-if="user.accent_color" class="w-20 h-4 mt-3 rounded" :style="{ backgroundColor: '#' + user.accent_color.toString(16) }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const userId = ref("");
const user = ref<any>(null);
const loading = ref(false);
const error = ref("");

async function lookupUser() {
  if (!userId.value) return;
  user.value = null;
  error.value = "";
  loading.value = true;

  try {
    const res = await axios.get(`/api/user/${userId.value}`);
    if (res.data.error) throw new Error(res.data.error);
    user.value = res.data;
  } catch (err: any) {
    error.value = err.message || "Bir hata oluştu.";
  } finally {
    loading.value = false;
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("tr-TR");
}

useHead({
	title: 'Discord Lookup',
	meta: [
		{ name: 'description', content: 'Discord kullanıcılarını bulma uygulaması' },
		{ name: 'author', content: '@burakbehlull' },
	]
})
</script>
