<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hamstergram</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="signIn()"
      >
        <span class="mr-2">Sign in</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
      errorMessage: null,
      showError: false
    }
  },

  methods: {
    async signIn() {
      try {
        let googleUser = await this.$gAuth.signIn()
        console.log(googleUser)
      } catch (e) {
        console.error(e)
        this.errorMessage = e.message
        this.showError = true
      }
    }
  }
}
</script>
