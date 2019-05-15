import Vue from "vue";

import $router from "./router";
import $store from "./store";

Vue.mixin({
  computed: {
    application() {
      return {
        loading: $store.state.app.loading,
        loadingFullScreen: $store.state.app.loadingFullScreen
      };
    }
  },

  methods: {
    __startLoading(fullScreen = true) {
      $store.dispatch("app/startLoading", fullScreen);
    },
    __stopLoading() {
      $store.dispatch("app/stopLoading");
    },
    __handleError(context, err, notify = false) {
      if (err.response) {
        context.error = true;
        context.errorMessage = err.response.data.message ?
          err.response.data.message :
          err.response.statusText;

        if (notify) {
          context.$notify({
            title: "ERROR",
            message: context.errorMessage,
            type: "error"
          });
        }

        if (err.response.data.errorValidation) {
          context.$validator.errors.clear();

          context.validationErrors = err.response.data.errors;

          Object.keys(context.validationErrors).forEach(key => {
            context.$validator.errors.add({
              field: key,
              msg: context.validationErrors[key][0]
            });
          });
        }
      }
    },
    __roundHalf(value) {
      let splitedValue = parseFloat(value)
        .toFixed(1)
        .split(".");
      let x = parseInt(splitedValue[0]);
      let y = parseInt(splitedValue[1]);

      if (y > 0 && y <= 5) {
        y = 5;
      } else if (y > 5 && y <= 9) {
        x += 1;
        y = 0;
      }

      return parseFloat(`${x}.${y}`);
    },
    __focusElement(elementId) {
      document.getElementById(elementId).scrollIntoView({
        behavior: "smooth"
      });
    },
    __logout() {
      Vue.auth.destroy();

      $router.push({
        path: "/login",
        force: true
      });
    },
    __internationalCurrency(value) {
      return Vue.options.filters.currency(value, "", 2, {
        thousandsSeparator: ",",
        decimalSeparator: "."
      });
    },
    __fetchWarehouses() {
      return new Promise((resolve, reject) => {
        Vue.http()
          .get("/warehouses/list")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __fetchProvinces() {
      return new Promise((resolve, reject) => {
        Vue.http()
          .get("/provinces")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __fetchCitiesByProvince(id) {
      return new Promise((resolve, reject) => {
        Vue.http()
          .get(`/provinces/${id}/cities`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __fetchDistrictsByCity(id) {
      return new Promise((resolve, reject) => {
        Vue.http()
          .get(`/cities/${id}/sub-districts`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __fetchUserAddresses() {
      return new Promise((resolve, reject) => {
        Vue.authHttp()
          .get("/user/addresses/list")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __fetchAgentAddresses() {
      return new Promise((resolve, reject) => {
        Vue.authHttp()
          .get("/agent/addresses/list")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __getUsersByLevel(level, params) {
      return Vue.authHttp().get(`/users/${level}`, {
        params
      });
    },
    __fetchPages() {
      return new Promise((resolve, reject) => {
        Vue.authHttp("/configs/pages")
          .get("/configs/pages")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    __fetchMemberships() {
      return new Promise((resolve, reject) => {
        Vue.authHttp('/admin/memberships')
          .get("/admin/memberships")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    __fetchInbound() {
      return new Promise((resolve, reject) => {
        Vue.authHttp('/admin/inbound')
          .get("/admin/inbound")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    __fetchInprogres() {
      return new Promise((resolve, reject) => {
        Vue.authHttp('/admin/inbound/inprogres')
          .get("/admin/inbound/inprogres")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    __fetchConsolidate() {
      return new Promise((resolve, reject) => {
        Vue.authHttp('/admin/inbound/consolidate')
          .get("/admin/inbound/consolidate")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    __fetchNoteissues() {
      return new Promise((resolve, reject) => {
        Vue.authHttp('/admin/inbound/noteissues')
          .get("/admin/inbound/noteissues")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    __fetchProvincesLocationCode() {
      return new Promise((resolve, reject) => {
        Vue.authHttp()
          .get("/locations/provinces")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    __fetchCitiesLocationCode(data) {
      return new Promise((resolve, reject) => {
        Vue.authHttp()
          .get(`/locations/cities/${data}`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
});