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
    return Vue.authHttp().get(`/scan/${code}`);
  }
};

const calculator = {
  check(data = {}) {
    return Vue.http().post("/calculator", data);
  }
};

const promoCode = {
  get(params = {}, page) {
    return Vue.authHttp().get('/promo-codes?page=' + page, {
      params
    });
  },
  find(id) {
    return Vue.authHttp().get(`/promo-code/${id}`);
  },
  create(data = {}) {
    return Vue.authHttp().post("/promo-codes/", data);
  },
  update(id = null, data = {}) {
    return Vue.authHttp().put(`/promo-code/${id}`, data);
  },
  delete(id) {
    return Vue.authHttp().delete(`/categories/${id}`);
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
  updateDefault(id = null, data = {}) {
    return Vue.authHttp().put(`/categories/${id}/default_selected`, data);
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

const forgot = {
  sendEmail(email = '', origin = "") {
    // console.log(params)
    return Vue.http().post('forgot-password', {
      email,
      origin
    })
  },
  changePassword(data = {}) {
    // console.log(params)
    return Vue.http().post('reset-password', data)
  }
}

const invoice = {
  get(params = {}, page) {
    return Vue.authHttp().get("/invoices?page=" + page, {
      params
    });
  },
  getM(params = {}, page) {
    return Vue.authHttp().get("/minvoices?page=" + page, {
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
  },
  membershipUpdateStatus(id = null, data = {}) {
    return Vue.authHttp().put(
      `/m-payments/${id}/status?status=${data.status}`,
      data
    );
  },
  sendNotification(id = null, data = {}) {
    return Vue.authHttp().post(
      `/payments/${id}/notification`,
      data
    );
  },
};

const report = {
  airWaybill(params = {}, page) {
    return Vue.authHttp().get("/reports/air-waybill?page=" + page, {
      params
    });
  },
  airWaybillExportXLSX(params = {}) {
    return Vue.authHttp().get("/reports/air-waybill/export/xlsx", {
      params,
      responseType: "blob"
    });
  },
  airWaybillExportCSV(params = {}) {
    return Vue.authHttp().get("/reports/air-waybill/export/csv", {
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
  },
  sales(params = {}, page) {
    return Vue.authHttp().get("/reports/sales?page=" + page, {
      params
    });
  },
  salesExportXLSX(params = {}) {
    return Vue.authHttp().get("/reports/sales/export/xlsx", {
      params,
      responseType: "blob"
    });
  },
  salesExportCSV(params = {}) {
    return Vue.authHttp().get("/reports/sales/export/csv", {
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
  },
  userStore(params = {}) {
    return Vue.authHttp().post(`/user/store`, params);
  },
  getUserData(id) {
    return Vue.authHttp().get(`/userdata/${id}`);
  },
  updateUserData(id, data = {}) {
    return Vue.authHttp().put(`/userdata/${id}`, data);
  },
};

const warehouse = {
  all(params = {}) {
    return Vue.http().get("/warehouses/list", {
      params
    });
  },
  find(id) {
    return Vue.authHttp().get(`/warehouses/${id}`);
  },
  create(data = {}) {
    return Vue.authHttp().post("/warehouses/", data);
  },
  update(id = null, data = {}) {
    return Vue.authHttp().put(`/warehouses/${id}`, data);
  },
  delete(id) {
    return Vue.authHttp().delete(`/warehouses/${id}`);
  },
  updateStatus(code = null, data = {}) {
    return Vue.authHttp().put(`/warehouses/${code}/status`, data);
  }
};

const memberships ={
  get() {
    return Vue.authHttp().get(`/memberships`);
  },
  getMembershipsData(id) {
    return Vue.authHttp().get(`/memberships/${id}`);
  },
  update(id = null, data = {}) {
    return Vue.authHttp().put(`/memberships/${id}`, data);
  },
  updatePrice(id = null, data = {}) {
    return Vue.authHttp().put(`/warehouse/config_price/${id}`, {
      price_config: this.price_config
    });
  },
  delete(id) {
    return Vue.authHttp().delete(`/memberships/${id}`);
  }
}

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
  locationsCreate(data = {}) {
    return Vue.authHttp().post("/locations/", data);
  },
  locationsGet(id) {
    return Vue.authHttp().get(`/locations/${id}`);
  },
  locationsUpdate(id, data = {}) {
    return Vue.authHttp().put(`/locations/${id}`, data);
  },
  locationDelete(id) {
    return Vue.authHttp().delete(`/locations/${id}`);
  },
  subdistricts(params = {}, page) {
    return Vue.authHttp().get("/sub-districts?page=" + page, {
      params
    });
  },
  findSubdistrict(code) {
    return Vue.authHttp().get(`/sub-districts/${code}`);
  },
  cities(params = {}, page) {
    return Vue.authHttp().get("/city/list?page=" + page, {
      params
    });
  },

};

const inbound ={
  getNew(params = {}, page) {
    return Vue.authHttp().get("/admin/inbound?page=" + page, {
      params
    });
  },
  getInprogres(params = {}, page) {
    return Vue.authHttp().get("/admin/inbound/inprogres?page=" + page, {
      params
    });
  },
  getConsolidate(params = {}, page) {
    return Vue.authHttp().get("/admin/inbound/consolidate?page=" + page, {
      params
    });
  },
  getNoteissues(params = {}, page) {
    return Vue.authHttp().get("/admin/inbound/noteissues?page=" + page, {
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
    return Vue.authHttp().post("/agent/orders/kirimin", data);
  },
  updateItemStatus(orderCode = null, itemId = null, data = {}) {
    return Vue.authHttp().put(
      `/orders/${orderCode}/items/${itemId}/status`,
      data
    );
  }
}

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

const level = {
  get() {
    return Vue.authHttp().get("/levels");
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
  memberships,
  forgot,
  invoice,
  manifest,
  inbound,
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
  area,
  level,
  promoCode
};

Object.defineProperties(Vue.prototype, {
  $service: {
    get() {
      return services;
    }
  }
});