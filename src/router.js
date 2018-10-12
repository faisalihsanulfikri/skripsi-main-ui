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

import aMain from './views/admin/Main'
import aDashboard from './views/admin/Dashboard'
import aUser from './views/admin/user/Index'
import aCategories from './views/admin/master/Categories'
import aWarehouses from './views/admin/master/Warehouses'
import aExchange from './views/admin/master/Exchange'
import aArea from './views/admin/master/Area'
import aOrders from './views/admin/Orders'
import aInvoices from './views/admin/Invoices'

import gMain from './views/agent/Main'
import gDashboard from './views/agent/Dashboard'

import Main from './views/general/Main'
import Faq from './views/general/Faq'
import Aboutus from './views/general/Aboutus'
import Contactus from './views/general/Contactus'
import Terms from './views/general/Terms'
import Privacy from './views/general/Privacy'
import howtoBeliin from './views/general/HowtoBeliin'
import howtoKirimin from './views/general/HowtoKirimin'
import fiturBeliin from './views/general/FeatureBeliin'
import fiturKirimin from './views/general/FeatureKirimin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'faq',
          name: 'faq',
          component: Faq
        },
        {
          path: 'aboutus',
          name: 'aboutus',
          component: Aboutus
        },
        {
          path: 'contactus',
          name: 'contactus',
          component: Contactus
        },
        {
          path: 'terms',
          name: 'terms',
          component: Terms
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: Privacy
        },
        {
          path: 'general-kalkulator',
          name: 'general-kalkulator',
          component: mCalculator
        },
        {
          path: 'howto-kirimin',
          name: 'howto-kirimin',
          component: howtoKirimin
        },
        {
          path: 'howto-beliin',
          name: 'howto-beliin',
          component: howtoBeliin
        },
        {
          path: 'feature-kirimin',
          name: 'feature-kirimin',
          component: fiturKirimin
        },
        {
          path: 'feature-beliin',
          name: 'feature-beliin',
          component: fiturBeliin
        }
      ]
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
          path: 'account',
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
    },
    {
      path: '/admin',
      component: aMain,
      children: [
        {
          path: '/',
          component: aDashboard,
          name: 'admin-main'
        },
        {
          path: 'orders',
          component: aOrders,
          name: 'admin-orders'
        },
        {
          path: 'invoices',
          component: aInvoices,
          name: 'admin-invoices'
        },
        {
          path: 'users/:level',
          component: aUser,
          name: 'admin-user'
        },
        {
          path: 'master/categories',
          component: aCategories,
          name: 'admin-categories'
        },
        {
          path: 'master/warehouses',
          component: aWarehouses,
          name: 'admin-warehouses'
        },
        {
          path: 'master/exchange',
          component: aExchange,
          name: 'admin-exchange'
        },
        {
          path: 'master/area',
          component: aArea,
          name: 'admin-area'
        }
      ]
    },
    {
      path: '/agent',
      component: gMain,
      children: [
        {
          path: '/',
          component: gDashboard,
          name: 'agent-main'
        }
      ]
    }
  ]
})
