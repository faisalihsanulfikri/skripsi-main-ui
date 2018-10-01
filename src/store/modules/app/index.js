import * as type from './types'

export default {
  namespaced: true,
  state: {
    initialize: false,
    loading: false,
    error: false,
    errorMessage: '',
    errorMessages: {}
  },
  mutations: {
    [type.INITIALIZED] (state) {
      state.initialize = true
    },
    [type.CHANGE_LOADING] (state, status) {
      state.loading = status
    },
    [type.SET_ERROR] (state, error) {
      if (error === null) {
        state.error = false
        state.errorMessage = ''
        state.errorMessages = {}

        return
      }

      state.error = error.status
      state.errorMessage = error.message
      state.errorMessages = error.data ? error.data : {}
    }
  },
  actions: {
    startLoading ({ commit }) {
      commit(type.CHANGE_LOADING, true)
    },
    stopLoading ({ commit }) {
      commit(type.CHANGE_LOADING, false)
    },
    setError ({ commit }, error = null) {
      commit(type.SET_ERROR, error)
    }
  }
}
