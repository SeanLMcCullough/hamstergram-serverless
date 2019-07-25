<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hamstergram</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat v-if="!isAuthenticated" @click="signIn">
        <span class="mr-2">Sign in</span>
      </v-btn>
      <v-btn flat v-else @click="signOut">
        <span class="mr-2">Sign out</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container>
        <v-layout wrap v-if="signedIn">
          <v-flex xs12 md10 lg8 offset-md1 offset-lg2>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Squeak about something</h3>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <post-form @submit="post" :submitting="posting"/>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <Feed />
          </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
          <v-flex xs12 md6 offset-md-3 text-xs-center>
            Sign in to share a squeak
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <amplify-authenticator v-bind:authConfig="authConfig" />
  </v-app>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
import { components } from 'aws-amplify-vue'
import Feed from '@/components/Feed'
import PostForm from '@/components/PostForm'

export default {
  name: 'App',

  components: {
    Feed,
    PostForm,
    ...components
  },

  data () {
    return {
      signedIn: false,
      authConfig: {
        signInConfig: {
          header: 'Log in to Hamstergram'
        },
        signUpConfig: {
          header: 'Sign up to Hamstergram',
          hideAllDefaults: true,
          signUpFields: [{
            label: 'Username',
            key: 'username',
            required: true
          }, {
            label: 'Email',
            key: 'email',
            required: true
          }, {
            label: 'Password',
            key: 'password',
            type: 'password',
            required: true
          }]
        }
      }
    }
  },

  beforeCreate() {
    AmplifyEventBus.$on('authState', state => {
      this.signedIn = state === 'signedIn'
    })

    Auth.currentAuthenticatedUser()
      .then(user => {
        this.signedIn = true
      })
      .catch(() => this.signedIn = false)
  },

  methods: {
    async signIn() {
    },

    signOut() {
    }
  }
}
</script>
