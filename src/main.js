import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { api_url } from "./url";

Axios.defaults.baseURL = api_url;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
