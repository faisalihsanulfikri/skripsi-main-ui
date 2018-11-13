import Vue from 'vue'

import router from './router'

Vue.mixin({
  methods: {
    __logout () {
      Vue.auth.destroy()

      router.push({
        path: '/',
        force: true
      })
    },
    __fetchWarehouses () {
      return new Promise((resolve, reject) => {
        Vue.http().get('/warehouses')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    __fetchProvinces () {
      return new Promise((resolve, reject) => {
        Vue.http().get('/provinces')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    __fetchCitiesByProvince (id) {
      return new Promise((resolve, reject) => {
        Vue.http().get(`/provinces/${id}/cities`)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    __fetchDistrictsByCity (id) {
      return new Promise((resolve, reject) => {
        Vue.http().get(`/cities/${id}/sub-districts`)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    __fetchUserAddresses () {
      return new Promise((resolve, reject) => {
        Vue.authHttp().get('/user/addresses')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    __focusElement (elementId) {
      document.getElementById(elementId).scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
})
