import Vue from 'vue'

const services = {
  login (data = {}) {
    return Vue.http().post('/login', data)
  },
  register (data = {}) {
    return Vue.http().post('/register', data)
  },
  createAwb(data = {}) {
    return Vue.authHttp().post('/awb', data)
  },
  deleteCategory(id) {
    return Vue.authHttp().delete(`/categories/${id}`)
  },
  getAllWarehouses () {
    return Vue.http().get('/warehouses/list')
  },
  getCategories (params = {}) {
    return Vue.http().get('/categories', {
      params: params
    })
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
  getUsersByLevel (level = null, params = {}) {
    return Vue.authHttp().get(`/users/${level}`, {
      params: params
    })
  },
  updateItemStatus (orderCode = null, itemId = null, data = {}) {
    return Vue.authHttp().put(`/orders/${orderCode}/items/${itemId}/status`, data)
  },
  updatePaymentStatus (id = null, data = {}) {
    return Vue.authHttp().put(`/payments/${id}/status`, data)
  }
}

Object.defineProperties(Vue.prototype, {
  $service: {
    get () { return services }
  }
})
