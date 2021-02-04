import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import VueSplide from '@splidejs/vue-splide'
import { rtdbPlugin } from 'vuefire'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(rtdbPlugin)
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueSplide)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

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
