import aMain from '../views/admin/Main'
import aDashboard from '../views/admin/Dashboard'
import aInvoice from '../views/admin/Invoices'
import aOrder from '../views/admin/Orders'
import aInbound from '../views/admin/Inbound'
import aCategory from '../views/admin/category/Index'
import aCategoryCreate from '../views/admin/category/Create'
import aWarehouse from '../views/admin/warehouse/Index'
import aWarehouseCreate from '../views/admin/warehouse/Create'
import aExchange from '../views/admin/exchange-rate/Index'
import aExchangeCreate from '../views/admin/exchange-rate/Create'
import aArea from '../views/admin/area/Index'
import aAreaCity from '../views/admin/area/City'
import aAreaDistrict from '../views/admin/area/District'
import aUser from '../views/admin/user/Index'

export default {
  path: '/admin',
  component: aMain,
  children: [
    {
      path: '/',
      component: aDashboard,
      name: 'admin-main'
    },
    {
      path: 'invoices',
      component: aInvoice,
      name: 'admin-invoice'
    },
    {
      path: 'orders',
      component: aOrder,
      name: 'admin-order'
    },
    {
      path: 'master/categories',
      component: aCategory,
      name: 'admin-category'
    },
    {
      path: 'master/categories/create',
      component: aCategoryCreate,
      name: 'admin-category-create'
    },
    {
      path: 'master/categories/:id/edit',
      component: aCategoryCreate,
      name: 'admin-category-edit'
    },
    {
      path: 'master/warehouses',
      component: aWarehouse,
      name: 'admin-warehouse'
    },
    {
      path: 'master/warehouses/create',
      component: aWarehouseCreate,
      name: 'admin-warehouse-create'
    },
    {
      path: 'master/warehouses/:id/edit',
      component: aWarehouseCreate,
      name: 'admin-warehouse-edit'
    },
    {
      path: 'master/exchange-rates',
      component: aExchange,
      name: 'admin-exchange-rate'
    },
    {
      path: 'master/exchange-rates/:id/edit',
      component: aExchangeCreate,
      name: 'admin-exchange-rate-edit'
    },
    {
      path: 'master/area',
      component: aArea,
      name: 'admin-area'
    },
    {
      path: 'master/area/provinces/:provinceId/cities',
      component: aAreaCity,
      name: 'admin-area-province-city'
    },
    {
      path: 'master/area/provinces/:provinceId/cities/:cityId/district',
      component: aAreaDistrict,
      name: 'admin-area-province-city-district'
    },
    {
      path: 'users/:level',
      component: aUser,
      name: 'admin-user'
    },
    {
      path: 'inbound',
      component: aInbound,
      name: 'admin-inbound'
    },
  ]
}
