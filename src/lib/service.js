import Vue from 'vue'

const services = {
  login (data = {}) {
    return Vue.http().post('/login', data)
  },
  register (data = {}) {
    return Vue.http().post('/register', data)
  },
  getAllWarehouses () {
    return Vue.http().get('/warehouses/list')
  },
  getInvoices (params = {}) {
    return Vue.authHttp().get('/invoices', {
      params: params
    })
  },
  getOrders (params = {}) {
    return Vue.authHttp().get('/orders', {
      params: params
    })
  },
  updatePaymentStatus (id = null, data = {}) {
    return Vue.authHttp().put(`/payments/${id}/status`, data)
  },
  updateItemStatus (orderCode = null, itemId = null, data = {}) {
    return Vue.authHttp().put(`/orders/${orderCode}/items/${itemId}/status`, data)
  }
}

Object.defineProperties(Vue.prototype, {
  $service: {
    get () { return services }
  }
})
