import { MutationTree } from 'vuex';
import { PrfMediaStateInterface } from './state';

const mutation: MutationTree<PrfMediaStateInterface> = {
  addMedia(state, result) {
    state.allMedia.push(result.data);
  },
  getMedia(state, result) {
    state.allMedia = [];
    state.allMedia = result;
  },
  getAllMedia(state, payload){
    state.allMedia = [];
    state.allMedia.push(...payload);
  }
};

export default mutation;
