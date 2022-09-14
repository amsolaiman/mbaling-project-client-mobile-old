import housingService from 'src/services/housing.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HousingStateInterface } from './state';

const actions: ActionTree<HousingStateInterface, StateInterface> = {
  async addHousing(context, payload: any) {
    const result = await housingService.addHousing(payload);
    context.commit('setNewHousing', result);
    return result;
  },

  async getAllHousing(context): Promise<any> {
    const res = await housingService.getAll();
    context.commit('getAllHousing', res);
  },

  async editHousingName(context, payload: any): Promise<any> {
    console.log(payload.id)
    await housingService.update(payload.id, payload);
    console.log('edit housing here 2')
    context.commit('updateHousing');
    this.dispatch('auth/authUser')
  },

  async getHousingById(context, id: number) {
    const res = await housingService.getHousingById(id);
    context.commit("getHousingById", res);
  },

};

export default actions;
