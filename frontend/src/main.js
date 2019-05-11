import VueTimeago from "vue-timeago";
import { format } from "date-fns";
import Vue from "vue";
import PortalVue from "portal-vue";
import Vuelidate from "vuelidate";
import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(PortalVue);
Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "en"
});

Vue.filter("date", function(value) {
  if (!value) return "";
  return format(value, "DD/MM/YYYY");
});

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  return `${value[0].toUpperCase()}${value.slice(1)}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
