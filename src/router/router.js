import Vue from "vue";
import VueRouter from "vue-router";
import Chart from "../components/Chart.vue"
import Table from "../components/CryptoCards.vue";
Vue.use(VueRouter);
export const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Table,
    },
    {
      name:"coin",
      path: "/:coin",
      component: Chart,
    },
  ],
  mode: "history",
});
