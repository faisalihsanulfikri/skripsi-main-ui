import Main from '../views/agent/Main'
import Dashboard from '../views/agent/Dashboard'
import OrderCreate from '../views/agent/order/Entry'
import OrderInbound from '../views/agent/order/Inbound'
import AgentReport from '../views/agent/AgentReport'

import { AGENT } from '../config/level'

export default {
  path: '/agent',
  component: Main,
  children: [
    {
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
      path: 'inbound',
      name: 'agent-inbound',
      component: OrderInbound,
      meta: {
        auth: true,
        level: [AGENT]
      }
    },
    {
      path: 'report',
      name: 'agent-report',
      component: AgentReport,
      meta: {
        auth: true,
        level: [AGENT]
      }
    }
  ]
}
