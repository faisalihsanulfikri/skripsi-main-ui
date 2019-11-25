import Vue from "vue";

const auth = {
  login(data = {}) {
    return Vue.http().post("/auth/login", data);
  },
  tenant(id = null) {
    return Vue.authHttp().get(`/get/website/${id}`);
  }
};

const product = {
  get(authTenant = {}) {
    console.log("product", authTenant);

    return Vue.tenant().post("/get/products", authTenant);
  },
  create(data = {}) {
    return Vue.tenant().post("/set/product", data);
  },
  find(id) {
    return Vue.tenant().get(`/get/product/${id}`);
  },
  update(id = null, data = {}) {
    return Vue.tenant().put(`/put/product/${id}`, data);
  },
  delete(id) {
    return Vue.tenant().delete(`/delete/product/${id}`);
  }
};

const services = {
  auth,
  product
};

Object.defineProperties(Vue.prototype, {
  $service: {
    get() {
      return services;
    }
  }
});
