import Vue from 'vue'

const config = {
  getBankAccounts () {
    return Vue.authHttp().get('/configs/bank_accounts')
  }
}

const auth = {
  register (data = {}) {
    return Vue.http().post('/register', data)
  },
  login (data = {}) {
    return Vue.http().post('/login', data)
  }
}

const awb = {
  create (data = {}) {
    return Vue.authHttp().post('/awb', data)
  }
}

const category = {
  get (params = {}) {
    return Vue.http().get('/categories', {
      params: params
    })
  },
  find (id) {
    return Vue.authHttp().get(`/categories/${id}`)
  },
  create (data = {}) {
    return Vue.authHttp().post('/categories/', data)
  },
  update (id = null, data = {}) {
    return Vue.authHttp().put(`/categories/${id}`, data)
  },
  delete (id) {
    return Vue.authHttp().delete(`/categories/${id}`)
  }
}

const invoice = {
  get (params = {}) {
    return Vue.authHttp().get('/invoices', {
      params: params
    })
  },
  find (code) {
    return Vue.authHttp().get(`/invoices/${code}`)
  },
  paymentConfirmation (code, data = {}) {
    return Vue.authHttp().post(`/invoices/${code}/payment-confirmation`, data)
  },
  createPayment (code, data = {}) {
    return Vue.authHttp().post(`/invoices/${code}/payments`, data)
  }
}

const order = {
  get (params = {}) {
    return Vue.authHttp().get('/orders', {
      params: params
    })
  },
  find (code) {
    return Vue.authHttp().get(`/orders/${code}`)
  },
  createKirimin (data = {}) {
    return Vue.authHttp().post('/orders/kirimin', data)
  },
  updateItemStatus (orderCode = null, itemId = null, data = {}) {
    return Vue.authHttp().put(`/orders/${orderCode}/items/${itemId}/status`, data)
  }
}

const orderAirWaybill = {
  find (number) {
    return Vue.authHttp().get(`/awb/${number}`)
  }
}

const payment = {
  updateStatus (id = null, data = {}) {
    return Vue.authHttp().put(`/payments/${id}/status`, data)
  }
}

const user = {
  getByLevel (level = null, params = {}) {
    return Vue.authHttp().get(`/users/${level}`, {
      params: params
    })
  }
}

const warehouse = {
  all (params = {}) {
    return Vue.http().get('/warehouses/list', {
      params: params
    })
  }
}

const services = {
  config,
  auth,
  awb,
  category,
  invoice,
  order,
  orderAirWaybill,
  payment,
  user,
  warehouse
}

Object.defineProperties(Vue.prototype, {
  $service: {
    get () { return services }
  }
})
