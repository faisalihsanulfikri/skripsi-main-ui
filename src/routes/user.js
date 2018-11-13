import Main from '../views/member/Main'
import Address from '../views/member/Address'
import Account from '../views/member/Account'
import mKirimin from '../views/member/Kirimin_3'
import Beliin from '../views/member/Beliin'
import Order from '../views/member/Order'
import OrderHistory from '../views/member/OrderHistory'
import Calculator from '../views/member/Calculator'

export default {
  path: '/u',
  component: Main,
  children: [
    {
      path: 'addresses',
      name: 'member-address',
      component: Address
    },
    {
      path: 'account',
      name: 'member-account',
      component: Account
    },
    {
      path: 'kirimin',
      name: 'member-kirimin',
      component: mKirimin
    },
    {
      path: 'beliin',
      name: 'member-beliin',
      component: Beliin
    },
    {
      path: 'orders',
      name: 'member-order',
      component: Order
    },
    {
      path: 'orders/:code/histories',
      name: 'member-order-history',
      component: OrderHistory
    },
    {
      path: 'calculator',
      name: 'member-calculator',
      component: Calculator
    }
  ]
}
