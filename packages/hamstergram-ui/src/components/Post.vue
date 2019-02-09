<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline" v-if="post.hamster && post.hamster.displayName">{{ post.hamster.displayName }}</div>
        <div class="headline" v-else>Anonymous</div>
        <div class="pre">{{ post.text }}</div>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat icon @click="like" :color="isLiked ? 'primary' : ''">
        <v-badge v-model="likes">
          <span slot="badge">{{ likes }}</span> <!--slot can be any component-->
          <v-icon>thumb_up</v-icon>
        </v-badge>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Post',

  props: {
    post: Object
  },

  data() {
    return {
      liked: false
    }
  },

  computed: {
    ...mapGetters(['accessToken', 'hamsterId']),
    likes() {
      return this.post.likes.length + (this.liked ? 1 : 0)
    },
    isLiked() {
      return this.liked ||
        this.post.likes.some(like => like.hamster._id === this.hamsterId)
    }
  },

  methods: {
    async like() {
      if (this.isLiked) return; // Only like once
      this.liked = true
      try {
        await fetch(process.env.VUE_APP_API_URL + `post/${this.post._id}/like`, {
          method: 'PUT',
          headers: {
            'access_token': this.accessToken
          }
        })
      } catch (e) {
        console.error(e)
        this.liked = false
      }
    }
  }
}
</script>

<style scoped lang="css">
.pre {
  white-space: pre; /* Render whitespace on post content */
}
</style>
