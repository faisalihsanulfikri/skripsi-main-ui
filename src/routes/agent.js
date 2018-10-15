import gMain from '../views/agent/Main'
import gDashboard from '../views/agent/Dashboard'
import gAgentOrders from '../views/agent/AgentOrders'
import gAgentInbound from '../views/agent/AgentInbound'
import gAgentReport from '../views/agent/AgentReport'

export default {
  path: '/agent',
  component: gMain,
  children: [
    {
      path: '/',
      component: gDashboard,
      name: 'agent-main'
    },
    {
      path: 'orders',
      component: gAgentOrders,
      name: 'agent-orders'
    },
    {
      path: 'inbound',
      component: gAgentInbound,
      name: 'agent-inbound'
    },
    {
      path: 'report',
      component: gAgentReport,
      name: 'agent-report'
    }
  ]
}
