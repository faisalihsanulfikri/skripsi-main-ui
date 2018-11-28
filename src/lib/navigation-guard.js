import Vue from 'vue'

import * as Level from '../config/level'

export default async (to, from, next) => {
  if (to.name === 'login' || to.name === 'register') {
    if (Vue.auth.hasAuth()) {
      let user = await Vue.auth.getUser()

      next({
        name: Level.ROUTE_LEVEL[user.level]
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.auth)) {
    let user = await Vue.auth.getUser()

    if (to.meta.level.includes(user.level)) {
      next()
    } else {
      next({
        name: Level.ROUTE_LEVEL[user.level]
      })
    }
  } else {
    next()
  }
}
