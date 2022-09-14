import { MutationTree } from "vuex";
import { UserStateInterface } from "./state";

const mutation: MutationTree<UserStateInterface> = {
  setNewAccount(state, payload) {
    state.newUser = payload;
  },
  editAccount(state, payload) {
    state.newUser = payload;
  },

  deleteAccount(state, payload) {
    state.allAccount.push(payload);
  },

  getAllUser(state, payload) {
    state.allAccount = [];
    state.allAccount.push(...payload);
  },

  getUserById(state, payload) {
    state.newUser = payload;
  },

  getProfile(state, payload) {
    state.allAccount = payload;
  },
};

export default mutation;
