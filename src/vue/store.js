import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// Dispatchable mutations
export const mutations = {
  SET_ACTIVE: 'SET_ACTIVE',
  INCREMENT: 'INCREMENT',
  RESET_TIME: 'RESET_TIME',
  ADD_PREVIOUS_TIME: 'ADD_PREVIOUS_TIME',
};

// Dispatchable actions
export const actions = {
  START_INTERVAL: 'START_INTERVAL',
  STOP_INTERVAL: 'STOP_INTERVAL',
};

let interval = null;

export default new Vuex.Store({
  plugins: [ createLogger() ],
  // Initial State
  state: {
    time: 0.0,
    previousTimes: [],
    active: false,
  },
  // Mutations to synchronously modify the state
  mutations: {
    [mutations.SET_ACTIVE](state, payload) {
      state.active = payload;
    },
    [mutations.RESET_TIME](state, payload) {
      state.time = 0.0;
    },
    [mutations.INCREMENT](state, payload) {
      state.time += payload;
    },
    [mutations.ADD_PREVIOUS_TIME](state, payload) {
      state.previousTimes.push(payload);
    },
  },
  // Actions to perform async tasks
  actions: {
    [actions.START_INTERVAL]({ commit, state }) {
      interval = setInterval(() => commit(mutations.INCREMENT, 0.01), 10);
    },
    [actions.STOP_INTERVAL]({ commit, state }) {
      clearInterval(interval);
      interval = null;
    },
  },
});

