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
    auth: null,
    me: null
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
    hamsterId(state, { me }) {
      return me._id
    },
    me(state) {
      return state.me || {}
    }
  },

  mutations: {
    FLUSH_AUTH(state) {
      state.auth = null
      state.me = null
    },
    SIGN_IN(state, { authResponse, basicProfile, isSignedIn }) {
      state.auth = {
        authResponse,
        basicProfile,
        isSignedIn
      }
    },
    SET_ME(state, hamster) {
      state.me = hamster
    }
  },

  actions: {
    async FETCH_ME({ commit, getters }) {
      try {
        let response = await fetch(process.env.VUE_APP_API_URL + 'me', {
          headers: {
            'access_token': getters.accessToken
          }
        })
        let { data } = await response.json()

        commit('SET_ME', data)
      } catch(e) {
        console.error(e)
      }
    }
  }
})
