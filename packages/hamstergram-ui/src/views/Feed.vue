<template>
  <v-container>
    <v-layout
      wrap
      v-if="isAuthenticated"
    >
      <v-flex xs12 md10 offset-md-1>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Squeak about something</h3>
                </div>
              </v-card-title>
              <v-card-text>
                <post-form v-bind.sync="newPost" @submit="post" :submitting="posting"/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-alert type="error" dismissible v-model="showError">
              {{ errorMessage || 'An unknown error occurred. Please try again.' }}
            </v-alert>

            <v-alert type="info" :value="!posts.length && !loading">
              Start the discussion by posting a squeak
            </v-alert>

            <post class="mt-1" v-for="post of posts" :key="post._id" :post="post"/>

            <v-btn flat fab color="primary" @click="fetchPosts" :loading="loading">
              <v-icon>expand_more</v-icon>
            </v-btn>

          </v-flex>
        </v-layout>
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
import Post from '@/components/Post'

export default {
  name: 'Feed',

  components: {
    PostForm,
    Post
  },

  data() {
    return {
      posts: [],
      loading: false,
      posting: false,
      errorMessage: null,
      showError: false,
      newPost: {
        text: ' '
      },
      defaultPost: {
        text: ' '
      }
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
      if (!this.isAuthenticated) return
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

    async post() {
      if (!this.isAuthenticated) return
      this.resetError()
      this.posting = true

      try {
        let response = await fetch(process.env.VUE_APP_API_URL + `post`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'access_token': this.accessToken
          },
          body: JSON.stringify(this.newPost)
        })

        let { data } = await response.json()
        this.posts.unshift(data)
      } catch (e) {
        this.showError = true
        this.errorMessage = e.message
      }

      this.newPost = Object.assign({}, this.defaultPost)
      this.posting = false
    },

    resetError() {
      this.errorMessage = null
      this.showError = false
    },
  },

  created() {
    this.fetchPosts()
  }
}
</script>
