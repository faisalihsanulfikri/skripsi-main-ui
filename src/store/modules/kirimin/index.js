import Vue from 'vue'

import * as TYPES from './types'

const namespaced = true

const state = {
  formula: {},
  status: {}
}

const mutations = {
  [TYPES.SET_STATUS] (state, status) {
    state.status = status
  },
  [TYPES.SET_FORMULA] (state, formula) {
    state.formula = formula
  }
}

const actions = {
  initialize ({ dispatch }) {
    dispatch('getFormula')
    dispatch('getStaticConfig')
  },
  async getStaticConfig ({ commit }) {
    let res = await Vue.http().get('/static-configs')

    if (res.data) {
      commit(TYPES.SET_STATUS, res.data)
    }
  },
  async getFormula ({ commit }) {
    let res = await Vue.http().get('/configs/formula')

    if (res.data) {
      commit(TYPES.SET_FORMULA, res.data.value)
    }
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
