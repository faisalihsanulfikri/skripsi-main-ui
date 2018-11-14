import Main from '../views/admin/Main'
import Dashboard from '../views/admin/Dashboard'
import Invoice from '../views/admin/invoice/Index'
import Order from '../views/admin/Orders'
import Inbound from '../views/admin/Inbound'
import Category from '../views/admin/category/Index'
import CategoryCreate from '../views/admin/category/Create'
import Warehouse from '../views/admin/warehouse/Index'
import WarehouseCreate from '../views/admin/warehouse/Create'
import Exchange from '../views/admin/exchange-rate/Index'
import ExchangeCreate from '../views/admin/exchange-rate/Create'
import Area from '../views/admin/area/Index'
import AreaCity from '../views/admin/area/City'
import AreaDistrict from '../views/admin/area/District'
import User from '../views/admin/user/Index'

import { ADMIN } from '../config/level'

export default {
  path: '/admin',
  component: Main,
  children: [
    {
      path: '/',
      name: 'admin-main',
      component: Dashboard,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'invoices',
      name: 'admin-invoice',
      component: Invoice,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'orders',
      name: 'admin-order',
      component: Order,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'inbound',
      name: 'admin-inbound',
      component: Inbound,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/categories',
      name: 'admin-category',
      component: Category,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/categories/create',
      name: 'admin-category-create',
      component: CategoryCreate,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/categories/:id/edit',
      name: 'admin-category-edit',
      component: CategoryCreate,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/warehouses',
      name: 'admin-warehouse',
      component: Warehouse,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/warehouses/create',
      name: 'admin-warehouse-create',
      component: WarehouseCreate,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/warehouses/:id/edit',
      name: 'admin-warehouse-edit',
      component: WarehouseCreate,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/exchange-rates',
      name: 'admin-exchange-rate',
      component: Exchange,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/exchange-rates/:id/edit',
      name: 'admin-exchange-rate-edit',
      component: ExchangeCreate,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/area',
      name: 'admin-area',
      component: Area,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/area/provinces/:provinceId/cities',
      name: 'admin-area-province-city',
      component: AreaCity,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'master/area/provinces/:provinceId/cities/:cityId/district',
      name: 'admin-area-province-city-district',
      component: AreaDistrict,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    },
    {
      path: 'users/:level',
      name: 'admin-user',
      component: User,
      meta: {
        auth: true,
        level: [ADMIN]
      }
    }
  ]
}
