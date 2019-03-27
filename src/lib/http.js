import Vue from 'vue'
import axios from 'axios'

import $router from '../router'
import $store from '../store/index'

const baseUrl = process.env.VUE_APP_ROOT_API
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

  http.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.message === 'Network Error' || error.response) {
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
