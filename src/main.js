import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import VueSplide from '@splidejs/vue-splide'
import { rtdbPlugin } from 'vuefire'

Vue.use(rtdbPlugin)
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueSplide)

// Set translation plugin
function loadLocaleMessages () {
  const locales = require.context('./content', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: loadLocaleMessages()
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
