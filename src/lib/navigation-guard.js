import Vue from "vue";

export default async (to, from, next) => {
  if (to.name === "login" || to.name === "register") {
    if (Vue.auth.hasAuth()) {
      let user = await Vue.auth.getUser();

      next({
        name: "admin-main"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.auth)) {
    if (to.meta.level.includes(0)) {
      next();
    } else {
      next({
        name: "admin-main"
      });
    }
  } else {
    if (Vue.auth.hasAuth()) {
      next({
        name: "admin-main"
      });
    }
  }
};
