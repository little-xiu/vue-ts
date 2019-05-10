import Vue from 'vue';
import Vuex from 'vuex';
import positions from './modules/position';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    positions,
  },
  plugins: [],
});

window.store = store;


export default store;

