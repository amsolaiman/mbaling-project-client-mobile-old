
import prfmediaService from 'src/services/pfrmedia.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PrfMediaStateInterface } from './state';

const actions: ActionTree<PrfMediaStateInterface, StateInterface> = {
  async uploadMedia(context, payload: any) {
    const result = await prfmediaService.uploadPicture(payload);
    context.commit('addMedia', result);
    return result;
  },

  async getAllMedia(context): Promise<any> {
    const res = await prfmediaService.getAll();
    context.commit('getAllUser', res);
  },
};

export default actions;
