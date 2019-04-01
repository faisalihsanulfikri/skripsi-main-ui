import Main from '../views/agent/Main'
import AwbReport from '../views/agent/report/AirWaybill'
import AwbShow from '../views/agent/awb/Show'
import Dashboard from '../views/agent/Dashboard'
import Manifest from '../views/agent/report/Manifest'
import OrderCreate from '../views/agent/order/Entry'
import OrderInbound from '../views/agent/inbound/Simplified'
import OrderAdvInbound from '../views/agent/inbound/Advanced'
import OrderImportInbound from '../views/agent/inbound/Import'
import OrderExportInbound from '../views/agent/inbound/Export'
import OrderReport from '../views/agent/report/Order'
import ScanAwb from '../views/agent/outbound/ScanAwb'
import Sales from '../views/agent/report/Sales'

import {
  AGENT
} from '../config/level'

export default {
  path: '/agent',
  component: Main,
  children: [{
    path: '/',
    name: 'agent-main',
    component: Dashboard,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'orders/create',
    name: 'agent-order-create',
    component: OrderCreate,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'inbound/simplified',
    name: 'inbound-simplified',
    component: OrderInbound,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'inbound/advanced',
    name: 'inbound-advanced',
    component: OrderAdvInbound,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'inbound/import',
    name: 'inbound-import',
    component: OrderImportInbound,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'outbound/scan-awb',
    name: 'outbound/scan-awb',
    component: ScanAwb,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'air-waybills/:code',
    name: 'agent-awb-show',
    component: AwbShow,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'reports/order',
    name: 'agent-report-order',
    component: OrderReport,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'reports/air-waybill',
    name: 'agent-report-air-waybill',
    component: AwbReport,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'reports/manifest',
    name: 'agent-report-manifest',
    component: Manifest,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'reports/sales',
    name: 'agent-report-sales',
    component: Sales,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  {
    path: 'inbound/export',
    name: 'inbound-export',
    component: OrderExportInbound,
    meta: {
      auth: true,
      level: [AGENT]
    }
  },
  ]
}
