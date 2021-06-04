import Vue from "vue";
import Vuex from "vuex";
import crypto from "./crypto";
import chat from "./chat";
import table from "./table";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    crypto,
    chat,
    table
  },
});
export { store };
