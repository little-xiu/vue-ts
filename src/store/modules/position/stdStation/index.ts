import actions from './action';
import createResetAndChangeState from '@/store/createResetAndChangeState';
import { StateConfig } from './interfaces';

const defaultState: StateConfig = {
  stdStationList: {},
};

export default {
  namespaced: true,
  state: { ...defaultState },
  getters: {},
  mutations: {
    ...createResetAndChangeState(defaultState),
    stdStationList(state: StateConfig, payload: any) {
      state.stdStationList = payload;
    },
  },
  actions,
};