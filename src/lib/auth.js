import Vue from 'vue'

Vue.auth = {
  setToken (token, user = null) {
    localStorage.setItem('token', token)

    if (user !== null) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  getToken () {
    let token = localStorage.getItem('token')

    return token
  },
  hasToken () {
    let token = localStorage.getItem('token')

    if (token === null) return false

    return true
  },
  destroyToken () {
    localStorage.removeItem('token')

    if (Vue.auth.getUser() !== null) {
      localStorage.removeItem('user')
    }
  },
  getUser () {
    let user = localStorage.getItem('user')

    if (user === null) return null

    return JSON.parse(user)
  }
}

Object.defineProperties(Vue.prototype, {
  $auth: {
    get () {
      return Vue.auth
    }
  }
})
