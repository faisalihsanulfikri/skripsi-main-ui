import Main from '../views/admin/Main'

import AwbShow from '../views/agent/awb/Show'
import Dashboard from '../views/admin/Dashboard'
import Invoice from '../views/admin/invoice/Index'
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
import AreaSubDistrict from '../views/admin/area/Subdistrict'
import AreaCode from '../views/admin/area/LocationCode'
import AreaCodeCreate from '../views/admin/area/LocationCodeCreate'
import User from '../views/admin/user/Index'
import UserCreate from '../views/admin/UserCreate'
import Setting from '../views/admin/setting/Index'

import {
  ADMIN,
  SUPER_ADMIN
} from '../config/level'

export default {
  path: '/admin',
  component: Main,
  children: [{
      path: '/',
      name: 'admin-main',
      component: Dashboard,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'air-waybills/:code',
      name: 'admin-awb-show',
      component: AwbShow,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'invoices',
      name: 'admin-invoice',
      component: Invoice,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'orders',
      name: 'admin-order',
      component: Inbound,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'inbound',
      name: 'admin-inbound',
      component: Inbound,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/categories',
      name: 'admin-category',
      component: Category,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/categories/create',
      name: 'admin-category-create',
      component: CategoryCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: 'UserCreate',
      name: 'admin-user-create',
      component: UserCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: 'master/categories/:id/edit',
      name: 'admin-category-edit',
      component: CategoryCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/warehouses',
      name: 'admin-warehouse',
      component: Warehouse,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/warehouses/create',
      name: 'admin-warehouse-create',
      component: WarehouseCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/warehouses/:id/edit',
      name: 'admin-warehouse-edit',
      component: WarehouseCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/exchange-rates',
      name: 'admin-exchange-rate',
      component: Exchange,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/exchange-rates/:id/edit',
      name: 'admin-exchange-rate-edit',
      component: ExchangeCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/area',
      name: 'admin-area',
      component: Area,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/area/provinces/:provinceId/cities',
      name: 'admin-area-province-city',
      component: AreaCity,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/area/provinces/:provinceId/cities/:cityId/district',
      name: 'admin-area-province-city-district',
      component: AreaDistrict,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'master/area/subdistrict',
      name: 'admin-area-province-city-subdistrict',
      component: AreaSubDistrict,
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
      path: 'master/area/code/create',
      name: 'admin-area-code-create',
      component: AreaCodeCreate,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },
    {
      path: 'users/:level',
      name: 'admin-user',
      component: User,
      meta: {
        auth: true,
        level: [ADMIN, SUPER_ADMIN]
      }
    },

    {
      path: 'settings',
      name: 'admin-setting',
      component: Setting,
      meta: {
        auth: true,
        level: [SUPER_ADMIN]
      }
    }
  ]
}