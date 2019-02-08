import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    feed: []
  },
  getters: {
    auth(state) {
      return state.auth
    }
  },
  mutations: {
    setAuth(state, credentials) {
      state.auth = credentials
    }
  },
  actions: {
    signOut({ commit }) {
      commit('setAuth', null)
    }
  }
})
