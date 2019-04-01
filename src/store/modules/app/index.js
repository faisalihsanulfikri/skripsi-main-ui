import * as type from './types'

const namespaced = true

const state = {
  initialize: false,
  loading: false,
  loadingFullScreen: true
}

const mutations = {
  [type.INITIALIZED] (state) {
    state.initialize = true
  },
  [type.CHANGE_LOADING] (state, payload) {
    state.loading = payload.status
    state.loadingFullScreen = payload.fullScreen
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
}

const actions = {
  startLoading ({ commit }, fullScreen) {
    commit(type.CHANGE_LOADING, {
      status: true,
      fullScreen: fullScreen
    })
  },
  stopLoading ({ commit }) {
    commit(type.CHANGE_LOADING, {
      status: false,
      fullScreen: false
    })
  },
  setError ({ commit }, error = null) {
    commit(type.SET_ERROR, error)
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
