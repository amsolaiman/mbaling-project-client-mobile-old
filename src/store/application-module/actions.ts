import applicationService from 'src/services/applicant.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ApplicationStateInterface } from './state';

const actions: ActionTree<ApplicationStateInterface, StateInterface> = {
  async getAllApplication(context): Promise<any> {
    const res = await applicationService.getAll();
    context.commit('getAllApplication', res);
  },

  async getOneApplication(context, id: number): Promise<any> {
    const res = await applicationService.getOne(id);
    context.commit('getOneApplication', res);
    return res
  },

  async createApplication(context, payload: any): Promise<any> {
    const res = await applicationService.create(payload);
    context.commit('createApplication', res);
  },

  async updateApplication(context, payload: any): Promise<any> {
    await applicationService.update(payload.id, payload);
    await context.dispatch('getAllApplication');
  },

  async deleteApplication(context, id: number): Promise<any> {
    const res = await applicationService.delete(id);
    context.commit('deleteApplication', res);
    context.dispatch('getAllApplication');
  },
};

export default actions;
