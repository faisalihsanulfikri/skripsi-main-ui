import Main from "../views/admin/Main";

import Dashboard from "../views/admin/Dashboard";
import Website from "../views/admin/website/Index";
import WebsiteCreate from "../views/admin/website/Create";
import WebsiteEdit from "../views/admin/website/Create";

import { ADMIN } from "../config/level";

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
        level: [ADMIN]
      }
    },
    {
      path: "/websites",
      name: "websites",
      component: Website,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: "/websites/create",
      name: "websites-create",
      component: WebsiteCreate,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: "websites/:id/edit",
      name: "websites-edit",
      component: WebsiteEdit,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    }
  ]
};
