import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app/index'
import user from './modules/user/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    user
  }
})
