import mediaService from "src/services/media.service";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { MediaStateInterface } from "./state";

const actions: ActionTree<MediaStateInterface, StateInterface> = {
  async uploadMedia(context, payload: any) {
    const result = await mediaService.uploadPicture(payload);
    context.commit("addMedia", result);
    return result;
  },

  async updateMedia(context, payload: any): Promise<any> {
    await mediaService.update(payload.id, payload);
    console.log("edit media here ");
    await context.dispatch("updateMedia");
  },

  async getAllMedia(context): Promise<any> {
    const res = await mediaService.getAll();
    context.commit("getAllPhotos", res);
  },

  // async getAllMediById(context, id: number) {
  //   const res = await mediaService.getPicture(id);
  //   // const photos = res.map((i) => i.id);
  //   // context.commit("getAllPhotos", photos);
  // },
};

export default actions;
