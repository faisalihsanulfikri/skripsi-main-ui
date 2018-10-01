import Vue from 'vue'

import $store from '../store/index'

export default (to, from, next) => {
  $store.dispatch('app/setError')

  if (to.name !== 'splash-screen' && !$store.state.app.initialize) {
    next({ name: 'splash-screen' })
  } else if (to.name === 'login' || to.name === 'register') {
    if (Vue.auth.hasToken()) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.auth)) {
    if (Vue.auth.hasToken()) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
}
