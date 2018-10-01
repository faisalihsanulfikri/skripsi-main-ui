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

import Faq from './views/general/Faq'
import Aboutus from './views/general/Aboutus'
import Contactus from './views/general/Contactus'
import Terms from './views/general/Terms'
import Privacy from './views/general/Privacy'
import Howitwork from './views/general/Howitwork'
import Feature from './views/general/Feature'

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
      path: '/faq',
      name: 'faq',
      component: Faq
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: Aboutus
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: Contactus
    },
    {
      path: '/terms',
      name: 'terms',
      component: Terms
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/howitwork',
      name: 'howitwork',
      component: Howitwork
    },
    {
      path: '/feature',
      name: 'feature',
      component: Feature
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
