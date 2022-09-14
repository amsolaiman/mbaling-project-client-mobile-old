import { store } from "quasar/wrappers";
import { InjectionKey } from "vue";
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from "vuex";

import post from "./post";
import { PostStateInterface } from "./post/state";

import account from "./user";
import { UserStateInterface } from "./user/state";

import auth from "./auth"
import { IAuthState } from './auth/state';

import media from './media-module';
import { MediaStateInterface } from './media-module/state';

import prfmedia from './prfmedia-module';
import { PrfMediaStateInterface } from './prfmedia-module/state';

import housing from './housing-module'
import { HousingStateInterface } from "./housing-module/state";


import application from './application-module';
import { ApplicationStateInterface } from './application-module/state';

import nonaccount from './non-account-module';
import { NonAccountStateInterface } from './non-account-module/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
  post: PostStateInterface;
  account: UserStateInterface;
  auth: IAuthState;
  media: MediaStateInterface;
  housing: HousingStateInterface;
  application: ApplicationStateInterface;
  nonaccount: NonAccountStateInterface;
  prfmedia: PrfMediaStateInterface;
}

// provide typings for `this.$store`
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol("vuex-key");

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      // example
      post,
      account,
      auth,
      media,
      housing,
      application,
      nonaccount,
      prfmedia,


    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
