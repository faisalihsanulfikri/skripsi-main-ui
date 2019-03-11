import Vue from 'vue'

const agent = {
  getAddresses () {
    return Vue.authHttp().get('/agent/addresses/list')
  },
  getWarehouses () {
    return Vue.authHttp().get('/agent/warehouses/list')
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
  },
  find (code) {
    return Vue.authHttp().get(`/awb/${code}`)
  },
  find_number (code) {
    return Vue.authHttp().get(`/awb_number/${code}`)
  },
  scan (code) {
    // console.log(code)
    return Vue.authHttp().get(`/scan/${code}`)
  }
}

const calculator = {
  check (data = {}) {
    return Vue.http().post('/calculator', data)
  }
}

const category = {
  get (params = {}) {
    return Vue.http().get('/categories', {
      params
    })
  },
  all (params = {}) {
    return Vue.http().get('/categories/list', {
      params
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

const unit = {
  all () {
    return Vue.http().get('/units/list')
  }
}

const currency = {
  all () {
    return Vue.http().get('/currencies/list')
  }
}

const config = {
  all () {
    return Vue.authHttp().get('/configs/list')
  },
  getBankAccounts () {
    return Vue.authHttp().get('/res/configs/bank_accounts')
  },
  update (data = {}) {
    return Vue.authHttp().put('/configs', {
      configs: data
    })
  }
}

const invoice = {
  get (params = {}) {
    return Vue.authHttp().get('/invoices', {
      params
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

const manifest = {
  create (data = {}) {
    return Vue.authHttp().post('/manifest/', data)
  }
}

const order = {
  get (params = {}) {
    return Vue.authHttp().get('/orders', {
      params
    })
  },
  find (code) {
    return Vue.authHttp().get(`/orders/${code}`)
  },
  createKirimin (data = {}) {
    return Vue.authHttp().post('/orders/kirimin', data)
  },
  createKiriminFromAgent (data = {}) {
    // console.log(data)
    return Vue.authHttp().post('/agent/orders/kirimin', data)
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

const report = {
  airWaybill (params = {}) {
    return Vue.authHttp().get('/reports/air-waybill', {
      params
    })
  },
  airWaybillExport (params = {}) {
    return Vue.authHttp().get('/reports/air-waybill/export', {
      params,
      responseType: 'blob'
    })
  },
  order (params = {}) {
    return Vue.authHttp().get('/reports/order', {
      params
    })
  },
  orderExportXLSX (params = {}) {
    return Vue.authHttp().get('/reports/order/export/xlsx', {
      params,
      responseType: 'blob'
    })
  },
  orderExportCSV (params = {}) {
    return Vue.authHttp().get('/reports/order/export/csv', {
      params,
      responseType: 'blob'
    })
  }
}

const user = {
  get (params = {}) {
    return Vue.authHttp().get(`/users`, {
      params
    })
  },
  getAddresses () {
    return Vue.authHttp().get('/user/addresses/list')
  },
  getUserDetail () {
    return Vue.authHttp().get('/user')
  },
  getAddressesById (id) {
    return Vue.authHttp().get(`/users/${id}/addresses/list`)
  },
  getByLevel (level = null, params = {}) {
    return Vue.authHttp().get(`/users/${level}`, {
      params
    })
  }
}

const warehouse = {
  all (params = {}) {
    return Vue.http().get('/warehouses/list', {
      params
    })
  }
}

const importExcel = {
  store (data = {}) {
    return Vue.authHttp().post('importOrder/excel/kirimin', data)
  }
}

const chart = {
  get () {
    return Vue.authHttp().get('/chart')
  }
}

const services = {
  agent,
  auth,
  awb,
  calculator,
  category,
  chart,
  config,
  invoice,
  manifest,
  order,
  orderAirWaybill,
  payment,
  report,
  user,
  warehouse,
  currency,
  unit,
  importExcel
}

Object.defineProperties(Vue.prototype, {
  $service: {
    get () {
      return services
    }
  }
})
