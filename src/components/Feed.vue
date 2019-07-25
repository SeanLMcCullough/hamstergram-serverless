<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-alert type="error" dismissible v-model="showError">
          {{ errorMessage || 'An unknown error occurred. Please try again.' }}
        </v-alert>

        <v-alert type="info" :value="!posts.length && !loading">
          Start the discussion by posting a squeak
        </v-alert>

        <post class="mt-1" v-for="post of posts" :key="post._id" :post="post"/>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 text-xs-center>
        <v-btn flat fab color="primary" @click="fetchPosts" :loading="loading">
          <v-icon>expand_more</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Post from '@/components/Post'

export default {
  name: 'Feed',

  components: {
    Post
  },

  data() {
    return {
      posts: [],
      loading: false,
      posting: false,
      errorMessage: null,
      showError: false
    }
  }
}
</script>
