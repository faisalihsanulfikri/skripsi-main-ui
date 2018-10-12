import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAddressCard,
  faBullhorn,
  faCalculator,
  faCheck,
  faDollarSign,
  faEdit,
  faFileAlt,
  faFileInvoice,
  faQuestion,
  faSignInAlt,
  faStar,
  faTimes,
  faTrashAlt,
  faTruck,
  faUser,
  faWallet,
  faWarehouse } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faAddressCard,
  faBullhorn,
  faCalculator,
  faCheck,
  faDollarSign,
  faEdit,
  faFileAlt,
  faFileInvoice,
  faQuestion,
  faSignInAlt,
  faStar,
  faTimes,
  faTrashAlt,
  faTruck,
  faUser,
  faWallet,
  faWarehouse
])

Vue.component('font-awesome-icon', FontAwesomeIcon)
