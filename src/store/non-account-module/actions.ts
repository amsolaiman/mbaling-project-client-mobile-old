import nonAccountService from 'src/services/non-account.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { NonAccountStateInterface } from './state';

const actions: ActionTree<NonAccountStateInterface, StateInterface> = {
  async getAllNonAccount(context): Promise<any> {
    const res = await nonAccountService.getAll();
    context.commit('getAllNonAccount', res);
  },

  async getOneNonAccount(context, id: number): Promise<any> {
    const res = await nonAccountService.getOne(id);
    context.commit('getOneNonAccount', res);
  },

  async createNonAccount(context, payload: any): Promise<any> {
    const res = await nonAccountService.create(payload);
    context.commit('createNonAccount', res);
  },

  async updateNonAccount(context, payload: any): Promise<any> {
    await nonAccountService.update(payload.id, payload);
    await context.dispatch('getAllNonAccount');
  },

  async deleteNonAccount(context, id: number): Promise<any> {
    const res = await nonAccountService.delete(id);
    context.commit('deleteNonAccount', res);
  },
};

export default actions;
