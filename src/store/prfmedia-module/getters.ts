import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PrfMediaStateInterface } from './state';

const getters: GetterTree<PrfMediaStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
