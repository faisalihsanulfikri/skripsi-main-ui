import Main from "../views/admin/Main";

import AwbShow from '../views/agent/awb/Show'
import Dashboard from '../views/admin/Dashboard'
import Invoice from '../views/admin/invoice/Index'
import mInvoice from '../views/admin/invoice/Membership'
import Inbound from '../views/admin/order/Inbound'
import Category from '../views/admin/category/Index'
import CategoryCreate from '../views/admin/category/Create'
import Warehouse from '../views/admin/warehouse/Index'
import WarehouseCreate from '../views/admin/warehouse/Create'
import Exchange from '../views/admin/exchange-rate/Index'
import ExchangeCreate from '../views/admin/exchange-rate/Create'
import Area from '../views/admin/area/Index'
import AreaCity from '../views/admin/area/City'
import AreaDistrict from '../views/admin/area/District'
import AreaSubDistrict from '../views/admin/area/subdistrict/Index'
import AreaSubDistrictEdit from '../views/admin/area/subdistrict/Create'
import AreaIndexCity from '../views/admin/area/city/Index'
import AreaCode from '../views/admin/area/location/Index'
import AreaCodeCreate from '../views/admin/area/location/Create'
import User from '../views/admin/user/Index'
import UserCreate from '../views/admin/user/Create'
import UserEdit from '../views/admin/user/Edit'
import UserDetail from '../views/admin/user/Detail'
import Sales from '../views/admin/report/Sales'
import Setting from '../views/admin/setting/Index'
import PromoCode from '../views/admin/master/promo-code/Index'
import PromoCodeCreate from '../views/admin/master/promo-code/Create'
import Membership from '../views/admin/Membership/Index'
import MembershipCreate from '../views/admin/Membership/Create'
import MemberShipedit from '../views/admin/Membership/Edit'

import {
  ADMIN,
  SUPER_ADMIN
} from "../config/level";

export default {
  path: "/admin",
  component: Main,
  children: [{
      path: "/",
      name: "admin-main",
      component: Dashboard,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "air-waybills/:code",
      name: "admin-awb-show",
      component: AwbShow,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'reports/sales',
      name: 'admin-report-sales',
      component: Sales,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "invoices",
      name: "admin-invoice",
      component: Invoice,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "minvoices",
      name: "admin-minvoice",
      component: mInvoice,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "orders",
      name: "admin-order",
      component: Inbound,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "inbound",
      name: "admin-inbound",
      component: Inbound,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/categories",
      name: "admin-category",
      component: Category,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/categories/create",
      name: "admin-category-create",
      component: CategoryCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: 'user/create',
      name: 'admin-user-create',
      component: UserCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: 'user/:id/edit',
      name: 'admin-user-edit',
      component: UserEdit,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: 'user/:id/detail',
      name: 'admin-user-detail',
      component: UserDetail,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/promo-codes",
      name: "admin-promo-codes",
      component: PromoCode,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/promo-codes/create",
      name: "admin-promo-codes-create",
      component: PromoCodeCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/promo-codes/:id/edit",
      name: "admin-promo-codes-edit",
      component: PromoCodeCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/categories/:id/edit",
      name: "admin-category-edit",
      component: CategoryCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/warehouses",
      name: "admin-warehouse",
      component: Warehouse,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/warehouses/create",
      name: "admin-warehouse-create",
      component: WarehouseCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/warehouses/:id/edit",
      name: "admin-warehouse-edit",
      component: WarehouseCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/exchange-rates",
      name: "admin-exchange-rate",
      component: Exchange,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/exchange-rates/:id/edit",
      name: "admin-exchange-rate-edit",
      component: ExchangeCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/area",
      name: "admin-area",
      component: Area,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/area/provinces/:provinceId/cities",
      name: "admin-area-province-city",
      component: AreaCity,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/area/provinces/:provinceId/cities/:cityId/district",
      name: "admin-area-province-city-district",
      component: AreaDistrict,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/area/subdistrict",
      name: "admin-area-subdistrict",
      component: AreaSubDistrict,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/area/subdistrict/edit",
      name: "admin-area-subdistrict-edit",
      component: AreaSubDistrictEdit,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/area/city/',
      name: 'admin-area-city',
      component: AreaIndexCity,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/area/code/',
      name: 'admin-area-code',
      component: AreaCode,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "master/area/code/create",
      name: "admin-area-code-create",
      component: AreaCodeCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: "users/:level",
      name: "admin-user",
      component: User,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: "membershipcreate",
      name: "membership-create",
      component: MembershipCreate,
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    },
    {
       path: "Memberships/:id/edit",
       name: "membership-edit",
       component: MemberShipedit,
       meta: {
         auth: true,
         level: [SUPER_ADMIN]
       }
     },
    {
      path: "membership",
      name: "membership",
      component: Membership,
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    },

    //  {
    //    path: "membershipstore",
    //    name: "membership-store",
    //    component: Membership,
    //    meta: {
    //      auth: true,
    //      level: [SUPER_ADMIN]
    //    }
    //  },

    {
      path: "settings",
      name: "admin-setting",
      component: Setting,
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    },

    {
      path: "pages",
      name: "admin-pages",
      component: () => import("@/views/admin/pages/Index"),
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    },

    {
      path: "pages/add",
      name: "admin-pages-new",
      component: () => import("@/views/admin/pages/AddNewPage"),
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    },

    {
      path: "pages/:slug",
      name: "admin-pages-single",
      component: () => import("@/views/admin/pages/SinglePage"),
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    }
  ]
};