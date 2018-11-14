import Main from '../views/member/Main'
import Address from '../views/member/Address'
import Account from '../views/member/Account'
import mKirimin from '../views/member/Kirimin_3'
import Beliin from '../views/member/Beliin'
import Order from '../views/member/Order'
import OrderHistory from '../views/member/OrderHistory'
import Calculator from '../views/member/Calculator'

import { REGULAR, PREMIUM } from '../config/level'

export default {
  path: '/u',
  component: Main,
  children: [
    {
      path: 'addresses',
      name: 'member-address',
      component: Address,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    },
    {
      path: 'account',
      name: 'member-account',
      component: Account,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    },
    {
      path: 'kirimin',
      name: 'member-kirimin',
      component: mKirimin,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    },
    {
      path: 'beliin',
      name: 'member-beliin',
      component: Beliin,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    },
    {
      path: 'orders',
      name: 'member-order',
      component: Order,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    },
    {
      path: 'orders/:code/histories',
      name: 'member-order-history',
      component: OrderHistory,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    },
    {
      path: 'calculator',
      name: 'member-calculator',
      component: Calculator,
      meta: {
        auth: true,
        level: [REGULAR, PREMIUM]
      }
    }
  ]
}
