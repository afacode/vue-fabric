import Vue from 'vue';
import Vuex from 'vuex';
import fabricObj from './modules/fabricObj'; //user
import user from './modules/user'; //user
import images from './modules/images'; 
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    fabricObj,
    user,
    images
  },
  getters
});

export default store
