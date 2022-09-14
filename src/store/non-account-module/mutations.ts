import { MutationTree } from 'vuex';
import { NonAccountStateInterface } from './state';

const mutation: MutationTree<NonAccountStateInterface> = {
  getAllNonAccount(state, payload: any) {
    state.allNonAccount = [];
    state.allNonAccount.push(...payload);
  },

  getOneNonAccount(state, payload) {
    state.nonAccount = payload;
  },

  createNonAccount(state, payload) {
    state.allNonAccount.push(payload);
  },

  updateNonAccount(state, payload) {
    state.allNonAccount.push(payload);
  },

  deleteNonAccount(state, payload) {
    state.allNonAccount.push(payload);
  }
};

export default mutation;
