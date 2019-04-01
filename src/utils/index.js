import orderItem from './order-item'

const Util = {
  install (Vue) {
    Vue.prototype.$util = {
      orderItem
    }
  }
}

export default Util
