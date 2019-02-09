<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      v-if="isAuthenticated"
    >
      <v-flex xs12 md10 offset-md-1>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Squeak about something</h3>
              <post-form />
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="primary">Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 md10 offset-md-1 class="mt-5">
        <v-card>
          <v-card-text>
            <v-alert type="error" dismissible v-model="showError">
              {{ errorMessage || 'An unknown error occurred. Please try again.' }}
            </v-alert>

            <post-list :posts="posts" v-show="posts.length" />
            <p v-if="!posts.length">Start the discussion by posting a squeak</p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn flat fab color="primary" @click="fetchPosts" :loading="loading">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-else>
      <v-flex xs12 md6 offset-md-3 text-xs-center>
        Sign in to share a squeak
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { stringify } from 'query-string'
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'

export default {
  name: 'Feed',

  components: {
    PostForm,
    PostList
  },

  data() {
    return {
      posts: [],
      loading: false,
      errorMessage: null,
      showError: false
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'accessToken'])
  },

  watch: {
    isAuthenticated(v) {
      if (v) {
        this.fetchPosts()
      } else {
        this.posts = []
      }
    }
  },

  methods: {
    async fetchPosts() {
      this.resetError()
      this.loading = true

      try {
        let lastId
        if (this.posts.length) {
          lastId = this.posts[this.posts.length-1]._id
        }
        let qs = stringify({ 'last-id': lastId })

        let response = await fetch(process.env.VUE_APP_API_URL + `feed?${qs}`, {
          headers: {
            'access_token': this.accessToken
          }
        })

        let { data } = await response.json()
        if (data && data.length) {
          this.posts = this.posts.concat(data)
        }
      } catch (e) {
        console.error(e)
        this.showError = true
        this.errorMessage = e.message
      }

      this.loading = false
    },

    resetError() {
      this.errorMessage = null
      this.showError = false
    }
  }
}
</script>
