import { createI18n } from 'vue-i18n'

import locales from '@/locales'

const i18n = new createI18n({
  allowComposition: true,
  legacy: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: locales
})

// HMR (Hot Module Replacement) support for development
if (import.meta.hot) {
  // Accept updates for all locale files
  import.meta.hot.accept('@/locales', async newLocalesModule => {
    if (newLocalesModule) {
      // Update all i18n messages when any locale changes
      const newLocales = newLocalesModule.default
      Object.keys(newLocales).forEach(locale => {
        i18n.global.setLocaleMessage(locale, newLocales[locale])
      })
      console.log('🔥 Hot reloaded all locales')
    }
  })

  // Also accept direct updates to individual locale files
  import.meta.hot.accept(['@/locales/ja.js'], async () => {
    // Re-import the entire locales module to get fresh data
    const { default: newLocales } = await import(
      '@/locales/index.js?t=' + Date.now()
    )
    if (newLocales.ja) {
      i18n.global.setLocaleMessage('ja', newLocales.ja)
      console.log('🔥 Hot reloaded Japanese locale')
    }
  })
}

export default i18n
