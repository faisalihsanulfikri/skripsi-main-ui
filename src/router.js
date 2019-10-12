import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import UserRoutes from './routes/user'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    UserRoutes
  ]
});
