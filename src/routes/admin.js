import Main from "../views/admin/Main";

import Dashboard from "../views/admin/Dashboard";
import WebsiteIndex from "../views/admin/website/Index";

import { ADMIN, SUPER_ADMIN } from "../config/level";

export default {
  path: "/admin",
  component: Main,
  children: [
    {
      path: "/",
      name: "admin-main",
      component: Dashboard,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "/websites",
      name: "admin-main",
      component: Dashboard,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "/",
      name: "admin-main",
      component: Dashboard,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    }
  ]
};
