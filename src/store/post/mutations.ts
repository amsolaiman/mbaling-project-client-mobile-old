import { MutationTree } from "vuex";
import { PostStateInterface } from "./state";

const mutation: MutationTree<PostStateInterface> = {
  setPost(state, payload) {
    state.newPost = payload;
  },
  updatePost(state, payload) {
    state.newPost = payload;
  },
  deletePost(state, payload) {
    state.posts.push(payload);
  },

  getAllPost(state, payload) {
    state.posts = [];
    state.posts.push(...payload);
  },

  getOneUser(state, payload) {
    state.posts = payload;
  },

  getProfile(state, payload) {
    state.posts = payload;
  },

  getPostById(state, payload) {
    state.newPost = payload;
  }
};

export default mutation;
