<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hamstergram</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        v-if="!isAuthenticated"
        @click="signIn"
      >
        <span class="mr-2">Sign in</span>
      </v-btn>
      <v-btn
        flat
        v-else
        @click="signOut"
      >
        <span class="mr-2">Sign out</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  data () {
    return {
      errorMessage: null,
      showError: false
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'profile'])
  },

  methods: {
    async signIn() {
      try {
        this.resetError()
        this.$store.commit('FLUSH_AUTH')
        let googleUser = await this.$gAuth.signIn()
        let isSignedIn = googleUser.isSignedIn()
        if (isSignedIn) {
          let authResponse = googleUser.getAuthResponse()
          let basicProfile = googleUser.getBasicProfile()
          this.$store.commit('SIGN_IN', {
            authResponse,
            basicProfile,
            isSignedIn
          })
        }
      } catch (e) {
        console.error(e)
        this.errorMessage = e.message
        this.showError = true
      }
    },

    signOut() {
      this.$gAuth.signOut()
      this.$store.commit('FLUSH_AUTH')
    },

    resetError() {
      this.errorMessage = null
      this.showError = false
    }
  }
}
</script>
