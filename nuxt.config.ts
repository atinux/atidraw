// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-auth-utils',
  ],
  future: {
    // New directory structure
    // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
    compatibilityVersion: 4,
  },
  hub: {
    blob: true,
  },
  ui: {
    icons: ['ph', 'simple-icons', 'logos'],
  },
  // Development modules
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  devtools: { enabled: true },
})
