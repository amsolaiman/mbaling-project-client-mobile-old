import { UserDto } from "./../../services/rest-api/api";
import userService from "src/services/user.service";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { UserStateInterface } from "./state";

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async addAccount(context, payload: any): Promise<any> {
    const result = await userService.create(payload);
    context.commit("setNewAccount", result);
    await context.dispatch("getAllUser");
  },

  async editAccount(context, payload: any): Promise<any> {
    await userService.update(payload.id, payload);
    console.log(payload);
    console.log("edit here 2");
    await context.dispatch("getAllUser");
    await this.dispatch("auth/authUser");
  },
  async deleteAccount(context, id: number): Promise<any> {
    const result = await userService.delete(id);
    context.commit("deleteAccount", result);
    await context.dispatch("getAllUser");
  },

  async getAllUser(context): Promise<any> {
    const res = await userService.getAll();
    context.commit("getAllUser", res);
  },

  async getUserById(context, id: number): Promise<any> {
    const res = await userService.getUserById(id);
    console.log(res + " User Action Here");
    context.commit("getUserById", res);
  },

  async getProfile(context): Promise<any> {
    const res = await userService.getUserProfile();
    context.commit("getProfile", res);
    return res;
  },
};

export default actions;
