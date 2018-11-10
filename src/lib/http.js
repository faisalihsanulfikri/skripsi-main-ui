import Vue from 'vue'
import axios from 'axios'

import $router from '../router'
import $store from '../store/index'

// const api = 'http://45.76.163.191:3003'
const baseUrl = 'http://localhost:8000'
const api = `${baseUrl}/api`

Vue.web = () => {
  let web = axios.create({
    baseURL: baseUrl
  })

  return web
}

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
        Vue.auth.destroy()

        $router.push({ path: '/login' })
      }
    }

    $store.dispatch('app/stopLoading')

    return Promise.reject(error)
  })

  return http
}

Object.defineProperties(Vue.prototype, {
  $web: {
    get () { return Vue.web() }
  },
  $http: {
    get () { return Vue.http() }
  },
  $authHttp: {
    get () { return Vue.authHttp() }
  }
})
