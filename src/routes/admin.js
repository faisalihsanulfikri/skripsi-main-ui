import Main from "../views/admin/Main";

// import AwbShow from '../views/agent/awb/Show'
import Dashboard from "../views/admin/Dashboard";
// import Invoice from '../views/admin/invoice/Index'
// import mInvoice from '../views/admin/invoice/Membership'
// import Inbound from '../views/admin/order/Inbound'
// import Category from '../views/admin/category/Index'
// import CategoryCreate from '../views/admin/category/Create'
// import Warehouse from '../views/admin/warehouse/Index'
// import WarehouseCreate from '../views/admin/warehouse/Create'
// import Exchange from '../views/admin/exchange-rate/Index'
// import ExchangeCreate from '../views/admin/exchange-rate/Create'
// import Area from '../views/admin/area/Index'
// import AreaCity from '../views/admin/area/City'
// import AreaDistrict from '../views/admin/area/District'
// import AreaSubDistrict from '../views/admin/area/subdistrict/Index'
// import AreaSubDistrictEdit from '../views/admin/area/subdistrict/Create'
// import AreaIndexCity from '../views/admin/area/city/Index'
// import AreaCode from '../views/admin/area/location/Index'
// import AreaCodeCreate from '../views/admin/area/location/Create'
// import User from '../views/admin/user/Index'
// import UserCreate from '../views/admin/user/Create'
// import UserEdit from '../views/admin/user/Edit'
// import UserDetail from '../views/admin/user/Detail'
// import Sales from '../views/admin/report/Sales'
// import Setting from '../views/admin/setting/Index'
// import PromoCode from '../views/admin/master/promo-code/Index'
// import PromoCodeCreate from '../views/admin/master/promo-code/Create'
// import Membership from '../views/admin/Membership/Index'
// import MembershipCreate from '../views/admin/Membership/Create'
// import MemberShipedit from '../views/admin/Membership/Edit'
// import Inboundnew from '../views/admin/inbound/new'
// import Inboundinprogres from '../views/admin/inbound/inprogres'
// import Inboundconsolidate from '../views/admin/inbound/consolidate'
// import Inboundnoteissues from '../views/admin/inbound/noteissues'

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
    }
  ]
};
