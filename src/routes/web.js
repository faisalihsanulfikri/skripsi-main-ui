import Main from '../views/general/Main'
// import Home from '../views/Home'
import Faq from '../views/general/Faq'
import Aboutus from '../views/general/Aboutus'
import Contactus from '../views/general/Contactus'
import Terms from '../views/general/Terms'
import Privacy from '../views/general/Privacy'
import HowToBeliin from '../views/general/HowtoBeliin'
import HowToKirimin from '../views/general/HowtoKirimin'
import FiturBeliin from '../views/general/FeatureBeliin'
import FiturKirimin from '../views/general/FeatureKirimin'
import Calculator from '../views/member/Calculator'

import Register from '../views/Register'
import Login from '../views/Login'

export default {
  path: '/',
  component: Main,
  children: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
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
      component: Calculator
    },
    {
      path: 'howto-kirimin',
      name: 'howto-kirimin',
      component: HowToKirimin
    },
    {
      path: 'howto-beliin',
      name: 'howto-beliin',
      component: HowToBeliin
    },
    {
      path: 'feature-kirimin',
      name: 'feature-kirimin',
      component: FiturKirimin
    },
    {
      path: 'feature-beliin',
      name: 'feature-beliin',
      component: FiturBeliin
    }
  ]
}
