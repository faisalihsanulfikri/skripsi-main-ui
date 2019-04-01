import Vue from 'vue'
import * as types from './types'

export default {
  namespaced: true,
  state: {
    profile: {
      name: '',
      email: '',
      phone: ''
    }
  },
  mutations: {
    [types.SET_PROFILE] (state, profile) {
      state.profile.name = profile.name
      state.profile.email = profile.email
      state.profile.phone = profile.phone
    }
  },
  actions: {
    getProfile ({ commit, dispatch }) {
      Vue.authHttp().get('/user/profile')
        .then(response => {
          commit(types.SET_PROFILE, response.data)
        })
        .catch(error => {
          if (!error.response) {
            dispatch('app/setError', {
              status: true,
              message: error.message
            }, { root: true })
          }
        })
    }
  }
}
