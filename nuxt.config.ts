import daisyui from 'daisyui'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
	tailwindcss: {
    cssPath: './app/main.css',
	config: {
		plugins: [daisyui()]
	}
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
