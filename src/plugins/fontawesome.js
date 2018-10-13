import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faAngleRight,
  faAddressCard,
  faBullhorn,
  faCalculator,
  faCheck,
  faChevronLeft,
  faDollarSign,
  faEdit,
  faFileAlt,
  faFileInvoice,
  faMap,
  faPlus,
  faQuestion,
  faSignInAlt,
  faStar,
  faTags,
  faTimes,
  faTrashAlt,
  faTruck,
  faUser,
  faWallet,
  faWarehouse } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faAngleDown,
  faAngleRight,
  faAddressCard,
  faBullhorn,
  faCalculator,
  faCheck,
  faChevronLeft,
  faDollarSign,
  faEdit,
  faFileAlt,
  faFileInvoice,
  faMap,
  faPlus,
  faQuestion,
  faSignInAlt,
  faStar,
  faTags,
  faTimes,
  faTrashAlt,
  faTruck,
  faUser,
  faWallet,
  faWarehouse
])

Vue.component('font-awesome-icon', FontAwesomeIcon)
