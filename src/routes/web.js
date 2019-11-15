import Main from "../views/general/Main";
import Login from "../views/Login";

export default {
  path: "/",
  component: Main,
  children: [
    {
      path: "login",
      name: "login",
      component: Login
    }
  ]
};
