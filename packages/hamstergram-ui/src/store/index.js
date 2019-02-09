import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'Hamstergram'
})

export default new Vuex.Store({
  plugins: [
    vuexLocal.plugin
  ],

  state: {
    auth: null
  },

  getters: {
    auth(state) {
      return state.auth
    },
    isAuthenticated(state) {
      return state.auth
        && state.auth.isSignedIn
        && Date.now() < state.auth.authResponse.expires_at
    },
    profile(state, { isAuthenticated }) {
      return isAuthenticated
        ? state.auth.basicProfile
        : {}
    },
    accessToken(state, { isAuthenticated }) {
      return isAuthenticated
        ? state.auth.authResponse.access_token
        : null
    },
    hamsterId(state) {
      return null //TODO
    }
  },

  mutations: {
    FLUSH_AUTH(state) {
      state.auth = null
    },
    SIGN_IN(state, { authResponse, basicProfile, isSignedIn }) {
      state.auth = {
        authResponse,
        basicProfile,
        isSignedIn
      }
    }
  },

  actions: {
    signOut({ commit }) {
      commit('setAuth', null)
    }
  }
})
