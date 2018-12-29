import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VeeValidate from 'vee-validate'
import * as Sentry from '@sentry/browser'
import App from './App.vue'
import router from './router'
import store from './store/index'
import util from './utils'

import './mixins'

import './lib/http'
import './lib/auth'
import './lib/service'

import './plugins/fontawesome'
import './plugins/uikit'
import './plugins/element-ui'

Vue.use(Vue2Filters)
Vue.use(VeeValidate, {
  events: 'blur'
})
Vue.use(util)

Vue.config.productionTip = false

new Vue({
  router,

  store,

  render: h => h(App),

  data () {
    return {
      user: {}
    }
  },

  async created () {
    this.user = await this.$auth.getUser()
  }
}).$mount('#app')

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [new Sentry.Integrations.Vue({ Vue })]
})
