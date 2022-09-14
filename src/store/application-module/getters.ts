import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { ApplicationStateInterface } from "./state";

const getters: GetterTree<ApplicationStateInterface, StateInterface> = {
  getPendingAccount(state) {
    return state.applications.filter((i) => /^pending$/i.test(i.status || ""));
  },
  getAcceptedAccount(state) {
    return state.applications.filter((i) => /^accepted$/i.test(i.status || ""));
  },
};

export default getters;
