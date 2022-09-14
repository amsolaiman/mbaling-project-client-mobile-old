import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { PostStateInterface } from "./state";

const getters: GetterTree<PostStateInterface, StateInterface> = {
  visiblePost(state) {
    return state.posts.filter((i) =>
      /^true$/i.test(i.visibility || '')
    );
  },
};

export default getters;
