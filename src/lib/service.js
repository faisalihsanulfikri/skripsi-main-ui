import Vue from "vue";

const agent = {
  getAddresses() {
    return Vue.authHttp().get("/agent/addresses/list");
  },
  getWarehouses() {
    return Vue.authHttp().get("/agent/warehouses/list");
  }
};

const auth = {
  register(data = {}) {
    return Vue.http().post("/register", data);
  },
  login(data = {}) {
    return Vue.http().post("/login", data);
  }
};

const awb = {
  create(data = {}) {
    return Vue.authHttp().post("/awb", data);
  },
  find(code) {
    return Vue.authHttp().get(`/awb/${code}`);
  },
  find_number(code) {
    return Vue.authHttp().get(`/awb_number/${code}`);
  },
  scan(code) {
    // console.log(code)
    return Vue.authHttp().get(`/scan/${code}`);
  }
};

const calculator = {
  check(data = {}) {
    return Vue.http().post("/calculator", data);
  }
};

const category = {
  get(params = {}, page) {
    return Vue.http().get('/categories?page=' + page, {
      params
    });
  },
  all(params = {}) {
    return Vue.http().get("/categories/list", {
      params
    });
  },
  find(id) {
    return Vue.authHttp().get(`/categories/${id}`);
  },
  create(data = {}) {
    return Vue.authHttp().post("/categories/", data);
  },
  update(id = null, data = {}) {
    return Vue.authHttp().put(`/categories/${id}`, data);
  },
  delete(id) {
    return Vue.authHttp().delete(`/categories/${id}`);
  }
};

const unit = {
  all() {
    return Vue.http().get("/units/list");
  }
};

const currency = {
  all() {
    return Vue.http().get("/currencies/list");
  }
};

const exchangerates = {
  get(params = {}, page) {
    return Vue.authHttp().get("/exchangerates?page=" + page, {
      params
    });
  },
  find(code) {
    return Vue.authHttp().get(`/exchangerates/${code}`);
  }
};

const config = {
  all() {
    return Vue.authHttp().get("/configs/list");
  },
  getBankAccounts() {
    return Vue.authHttp().get("/res/configs/bank_accounts");
  },
  update(data = {}) {
    return Vue.authHttp().put("/configs", {
      configs: data
    });
  }
};

const invoice = {
  get(params = {}, page) {
    return Vue.authHttp().get("/invoices?page=" + page, {
      params
    });
  },
  find(id) {
    return Vue.authHttp().get(`/invoices/${id}`);
  },
  paymentConfirmation(code, data = {}) {
    return Vue.authHttp().post(`/invoices/${code}/payment-confirmation`, data);
  },
  createPayment(code, data = {}) {
    return Vue.authHttp().post(`/invoices/${code}/payments`, data);
  }
};

const manifest = {
  create(data = {}) {
    return Vue.authHttp().post("/manifest/", data);
  },
  get(params = {}, page) {
    return Vue.authHttp().get("/manifest?page=" + page, {
      params
    });
  },
  find(number) {
    return Vue.authHttp().get(`/manifest/${number}`);
  },
  toExcel(code) {
    return Vue.authHttp().get(`/manifest/${code}/toExcel`, {
      code,
      responseType: "blob"
    });
  }
};

const order = {
  get(params = {}, page) {
    return Vue.authHttp().get("/orders?page=" + page, {
      params
    });
  },
  find(code) {
    return Vue.authHttp().get(`/orders/${code}`);
  },
  createKirimin(data = {}) {
    return Vue.authHttp().post("/orders/kirimin", data);
  },
  createKiriminFromAgent(data = {}) {
    // console.log(data)
    return Vue.authHttp().post("/agent/orders/kirimin", data);
  },
  updateItemStatus(orderCode = null, itemId = null, data = {}) {
    return Vue.authHttp().put(
      `/orders/${orderCode}/items/${itemId}/status`,
      data
    );
  }
};

const orderAirWaybill = {
  find(number) {
    return Vue.authHttp().get(`/awb/${number}`);
  }
};

const payment = {
  updateStatus(id = null, data = {}) {
    return Vue.authHttp().put(
      `/payments/${id}/status?status=${data.status}`,
      data
    );
  }
};

const report = {
  airWaybill(params = {}, page) {
    return Vue.authHttp().get("/reports/air-waybill?page=" + page, {
      params
    });
  },
  airWaybillExport(params = {}) {
    return Vue.authHttp().get("/reports/air-waybill/export", {
      params,
      responseType: "blob"
    });
  },
  order(params = {}, page) {
    return Vue.authHttp().get("/reports/order?page=" + page, {
      params
    });
  },
  orderExportXLSX(params = {}) {
    return Vue.authHttp().get("/reports/order/export/xlsx", {
      params,
      responseType: "blob"
    });
  },
  orderExportCSV(params = {}) {
    return Vue.authHttp().get("/reports/order/export/csv", {
      params,
      responseType: "blob"
    });
  }
};

const user = {
  get(params = {}) {
    return Vue.authHttp().get(`/users`, {
      params
    });
  },
  getAddresses() {
    return Vue.authHttp().get("/user/addresses/list");
  },
  getUserDetail() {
    return Vue.authHttp().get("/user");
  },
  getAddressesById(id) {
    return Vue.authHttp().get(`/users/${id}/addresses/list`);
  },
  getByLevel(level = null, params = {}) {
    return Vue.authHttp().get(`/users/${level}`, {
      params
    });
  }
};

const warehouse = {
  all(params = {}) {
    return Vue.http().get("/warehouses/list", {
      params
    });
  }
};

const area = {
  provinces(params = {}, page) {
    return Vue.authHttp().get("/province/list?page=" + page, {
      params
    });
  },
  locations(params = {}, page) {
    return Vue.authHttp().get("/locations?page=" + page, {
      params
    });
  },
  subdistricts(params = {}, page) {
    return Vue.authHttp().get("/sub-districts?page=" + page, {
      params
    });
  },
  findSubdistrict(code) {
    return Vue.authHttp().get(`/sub-districts/${code}`);
  }
};


const importExcel = {
  store(data = {}) {
    return Vue.authHttp().post("importOrder/excel/kirimin", data);
  }
};

const chart = {
  get() {
    return Vue.authHttp().get("/chart");
  }
};

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
  importExcel,
  exchangerates,
  area
};

Object.defineProperties(Vue.prototype, {
  $service: {
    get() {
      return services;
    }
  }
});
