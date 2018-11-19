import Vue from 'vue'
import Router from 'vue-router'

import WebRoutes from './routes/web'
import AdminRoutes from './routes/admin'
import AgentRoutes from './routes/agent'
import UserRoutes from './routes/user'

import { PrintAwb } from './routes/print'

import navigationGuard from './lib/navigationGuard'

Vue.use(Router)

const router = new Router({
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    WebRoutes,
    AdminRoutes,
    AgentRoutes,
    UserRoutes,

    PrintAwb
  ]
})

router.beforeEach(navigationGuard)

export default router
