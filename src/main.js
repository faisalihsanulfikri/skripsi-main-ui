import Vue from "vue";
import Vue2Filters from "vue2-filters";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import util from "./utils";
import moment from "moment";
import AllIosIcon from "vue-ionicons/dist/ionicons-ios.js";

import "./mixins";
import "./lib/http";
import "./lib/auth";
import "./lib/service";
import "./plugins/fontawesome";
import "./plugins/element-ui";
import "./plugins/google-analytic";
import "./plugins/sentry";
import "./plugins/uikit";
import "./plugins/vue-tinymce";

Vue.prototype.moment = moment;
Vue.use(Vue2Filters);
Vue.use(VeeValidate, {
  events: "blur"
});
Vue.use(util);
Vue.use(AllIosIcon);

Vue.config.productionTip = false;

new Vue({
  router,

  store,

  render: h => h(App),

  data() {
    return {
      user: {}
    };
  },

  async created() {
    this.user = await this.$auth.getUser();
  }
}).$mount("#app");
