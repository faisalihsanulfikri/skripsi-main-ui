import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAddressCard,
  faBullhorn,
  faCalculator,
  faDollarSign,
  faFileAlt,
  faFileInvoice,
  faQuestion,
  faSignInAlt,
  faTruck,
  faUser,
  faWallet,
  faWarehouse,
  faTimes,
faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faAddressCard,
  faBullhorn,
  faCalculator,
  faDollarSign,
  faFileAlt,
  faFileInvoice,
  faQuestion,
  faSignInAlt,
  faTruck,
  faUser,
  faWallet,
  faWarehouse,
  faCheck,
  faTimes
])

Vue.component('font-awesome-icon', FontAwesomeIcon)
