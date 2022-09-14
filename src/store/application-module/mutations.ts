import { MutationTree } from 'vuex';
import { ApplicationStateInterface } from './state';

const mutation: MutationTree<ApplicationStateInterface> = {
  getAllApplication(state, payload: any) {
    state.applications = [];
    state.applications.push(...payload);
  },

  getOneApplication(state, payload) {
    state.application = payload;
  },

  createApplication(state, payload) {
    state.applications.push(payload);
  },

  updateApplication(state, payload) {
    state.applications.push(payload);
  },

  deleteApplication(state, payload) {
    state.applications.push(payload);
  }
};

export default mutation;
