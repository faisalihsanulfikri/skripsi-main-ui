import Vue from 'vue'

Vue.mixin({
  methods: {
    __fetchProvinces () {
      return new Promise((resolve, reject) => {
        Vue.http().get('/v1/calculator/province')
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
        Vue.http().get(`/v1/calculator/city/${id}/province`)
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
        Vue.http().get(`/v1/calculator/kecamatan/${id}`)
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
        Vue.authHttp().get('/v1/address')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
