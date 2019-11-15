import Vue from "vue";
import Router from "vue-router";

import WebRoutes from "./routes/web";
import AdminRoutes from "./routes/admin";

import navigationGuard from "./lib/navigation-guard";

Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  routes: [WebRoutes, AdminRoutes]
});

router.beforeEach(navigationGuard);

export default router;
