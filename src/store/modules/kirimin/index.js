import Vue from 'vue'

import * as TYPES from './types'

const namespaced = true

const state = {
  formula: {}
}

const mutations = {
  [TYPES.SET_FORMULA] (state, data) {
    state.formula = data
  }
}

const actions = {
  async getFormula ({ state, commit }) {
    let keys = Object.keys(state.formula)

    if (keys.length < 1) {
      let res = await Vue.http().get('/configs/formula')

      if (res.data) {
        commit(TYPES.SET_FORMULA, res.data.value)
      }
    }
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
