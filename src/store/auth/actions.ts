import { mbalingApiService } from "./../../services/mbaling-api.service";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { IAuthState } from "./state";
import userService from "src/services/user.service";
import { ChangePasswordDto } from "src/services/rest-api";

const actions: ActionTree<IAuthState, StateInterface> = {
  async login(context, payload: { userName: string; password: string }) {
    const user = await mbalingApiService.loginUser(
      payload.userName,
      payload.password
    );
    context.commit("setCurrentUser", user);
  },
  async authUser(context) {
    try {
      const user = await mbalingApiService.profile();
      context.commit("setCurrentUser", user.data);
      return user;
    } catch (error) {
      // work around
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      return error;
    }
  },

  async changePassword(context, changePassword: ChangePasswordDto) {
    await mbalingApiService.changePassword(changePassword);
  },
};

export default actions;
