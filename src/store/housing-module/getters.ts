import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { HousingStateInterface } from './state';

const getters: GetterTree<HousingStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
