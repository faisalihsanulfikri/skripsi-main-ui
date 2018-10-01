import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'

import mMain from './views/member/Main'
import mAddress from './views/member/Address'
import mAccount from './views/member/Account'
import mKirimin from './views/member/Kirimin'
import mBeliin from './views/member/Beliin'
import mOrder from './views/member/Order'
import mCalculator from './views/member/Calculator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/u',
      component: mMain,
      children: [
        {
          path: 'adresses',
          name: 'member-address',
          component: mAddress
        },
        {
          path: 'acount',
          name: 'member-account',
          component: mAccount
        },
        {
          path: 'kirimin',
          name: 'member-kirimin',
          component: mKirimin
        },
        {
          path: 'beliin',
          name: 'member-beliin',
          component: mBeliin
        },
        {
          path: 'orders',
          name: 'member-order',
          component: mOrder
        },
        {
          path: 'calculator',
          name: 'member-calculator',
          component: mCalculator
        }
      ]
    }
  ]
})
