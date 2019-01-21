import Vue from 'vue'

import * as TYPES from './types'

const namespaced = true

const state = {
  formula: {},
  currency: {},
  status: {},
  user: {},
}

const mutations = {
  [TYPES.SET_STATUS](state, status) {
    state.status = status
  },
  [TYPES.SET_FORMULA](state, formula) {
    state.formula = formula
  },
  [TYPES.SET_CURRENCY](state, currency) {
    state.currency = currency
  },
  [TYPES.SET_USER](state, user) {
    state.user = user
  }
}

const actions = {
  initialize({
    dispatch
  }) {
    dispatch('getFormula')
    dispatch('getStaticConfig')
    dispatch('getCurrency')
    dispatch('getUser')
  },
  async getStaticConfig({
    commit
  }) {
    let res = await Vue.http().get('/static-configs')

    if (res.data) {
      commit(TYPES.SET_STATUS, res.data)
    }
  },
  async getFormula({
    commit
  }) {
    let res = await Vue.http().get('/res/configs/formula')

    if (res.data) {
      commit(TYPES.SET_FORMULA, res.data.value)
    }
  },
  async getCurrency({
    commit
  }) {
    let res = await Vue.authHttp().get('/currencies/list')

    if (res.data) {
      commit(TYPES.SET_CURRENCY, res.data)
    }
  },
  async getUser({
    commit
  }) {
    let res = await Vue.authHttp().get('/user')

    if (res.data) {
      commit(TYPES.SET_USER, res.data)
    }
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}