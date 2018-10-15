import Vue from 'vue'
import Router from 'vue-router'

import WebRoutes from './routes/web'
import AdminRoutes from './routes/admin'
import AgentRoutes from './routes/agent'
import UserRoutes from './routes/user'

Vue.use(Router)

export default new Router({
  routes: [
    WebRoutes,
    AdminRoutes,
    AgentRoutes,
    UserRoutes
  ]
})
