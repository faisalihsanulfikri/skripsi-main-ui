import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'
import store from './store/index'

import './mixins'

import './lib/http'
import './lib/auth'

import './plugins/fontawesome'
import './plugins/vuetify'
import './plugins/uikit'
import './plugins/element-ui'

Vue.use(Vue2Filters)
Vue.use(VeeValidate, {
  events: 'blur'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
