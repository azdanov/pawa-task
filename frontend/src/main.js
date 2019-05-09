import Vue from "vue";
import PortalVue from "portal-vue";
import App from "./App";
import router from "./router";
import store from "./store";
import { format } from "date-fns";

Vue.config.productionTip = false;
Vue.use(PortalVue);

Vue.filter("date", function(value) {
  if (!value) return "";
  return format(value, "DD/MM/YYYY");
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
