import Main from '../views/member/Main'
import Address from '../views/member/Address'
import Account from '../views/member/Account'
import UserProfile from '../views/member/UserProfile'
import UserAddress from '../views/member/UserAddress'
import UserPassword from '../views/member/UserChangePassword'
import UserFile from '../views/member/UserFile'
import Kirimin from '../views/member/Kirimin_3'
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
      component: Account,
      children: [
        {
          path: '/',
          name: 'member-account',
          component: UserProfile,
          meta: {
            auth: true,
            level: [REGULAR, PREMIUM]
          }
        },
        {
          path: 'addresses',
          name: 'member-account-address',
          component: UserAddress,
          meta: {
            auth: true,
            level: [REGULAR, PREMIUM]
          }
        },
        {
          path: 'password',
          name: 'member-account-password',
          component: UserPassword,
          meta: {
            auth: true,
            level: [REGULAR, PREMIUM]
          }
        },
        {
          path: 'files',
          name: 'member-account-file',
          component: UserFile,
          meta: {
            auth: true,
            level: [REGULAR, PREMIUM]
          }
        }
      ]
    },
    {
      path: 'kirimin',
      name: 'member-kirimin',
      component: Kirimin,
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
