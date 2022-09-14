import { MutationTree } from "vuex";
import { MediaStateInterface } from "./state";

const mutation: MutationTree<MediaStateInterface> = {
  addMedia(state, result) {
    state.allMedia.push(result.data);
  },
  updateMedia(state, payload) {
    state.createMedia = payload;
  },
  getMedia(state, result) {
    state.allMedia = [];
    state.allMedia = result;
  },
  getAllMedia(state, payload) {
    state.allMedia = [];
    state.allMedia.push(...payload);
  },
  getAllPhotos(state, payload) {
    state.allPhotos = payload;
  },
};

export default mutation;
