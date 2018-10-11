import Vue from 'vue'
import axios from 'axios'

import $router from '../router'
import $store from '../store/index'

const api = 'http://45.76.163.191:3003'

Vue.http = () => {
  let http = axios.create({
    baseURL: api
  })

  http.interceptors.request.use(config => {
    $store.dispatch('app/startLoading')

    return config
  }, error => {
    return Promise.reject(error)
  })

  http.interceptors.response.use(response => {
    $store.dispatch('app/stopLoading')

    return response
  }, error => {
    $store.dispatch('app/stopLoading')

    return Promise.reject(error)
  })

  return http
}

Vue.authHttp = () => {
  let http = axios.create({
    baseURL: api,
    headers: {
      Authorization: `Bearer ${Vue.auth.getToken()}`,
      Accept: 'application/json'
    }
  })

  http.interceptors.request.use(config => {
    $store.dispatch('app/startLoading')

    return config
  }, error => {
    return Promise.reject(error)
  })

  http.interceptors.response.use(response => {
    $store.dispatch('app/stopLoading')

    return response
  }, error => {
    if (error.response) {
      if (error.response.status === 401) {
        Vue.auth.destroyToken()

        // $router.go({ path: '/login' })
      }
    }

    $store.dispatch('app/stopLoading')

    return Promise.reject(error)
  })

  return http
}

Object.defineProperties(Vue.prototype, {
  $http: {
    get () { return Vue.http() }
  },
  $authHttp: {
    get () { return Vue.authHttp() }
  }
})
