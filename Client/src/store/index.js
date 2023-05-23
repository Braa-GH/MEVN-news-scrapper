import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      token: null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
});