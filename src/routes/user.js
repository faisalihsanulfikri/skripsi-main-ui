import mMain from '../views/member/Main'
import mAddress from '../views/member/Address'
import mAccount from '../views/member/Account'
import mKirimin from '../views/member/Kirimin'
import mBeliin from '../views/member/Beliin'
import mOrder from '../views/member/Order'
import mCalculator from '../views/member/Calculator'

export default {
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
}
