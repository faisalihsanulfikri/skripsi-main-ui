import Vue from "vue";

import router from "../router";

Vue.auth = {
  setAuth(auth) {
    localStorage.setItem("auth", JSON.stringify(auth));
  },
  setAuthTenant(authTenant) {
    localStorage.setItem("authTenant", JSON.stringify(authTenant));
  },
  hasAuth() {
    let auth = localStorage.getItem("auth");

    if (auth === null) return false;

    return true;
  },
  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  async getUser() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      let res = await Vue.authHttp().get("/user");

      Vue.auth.setUser(res.data);

      user = res.data;
    }

    return user;
  },
  getToken() {
    let auth = JSON.parse(localStorage.getItem("auth"));

    if (auth === null) {
      localStorage.clear();
    }
    if (window.location.pathname == "/") {
      router.push({
        name: "login"
      });
    }
    return auth.access_token;
  },
  destroy() {
    localStorage.clear();
  }
};

Object.defineProperties(Vue.prototype, {
  $auth: {
    get() {
      return Vue.auth;
    }
  }
});
