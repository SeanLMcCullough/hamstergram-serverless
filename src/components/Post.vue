<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="headline" v-if="post.hamster && post.hamster.displayName">{{ post.hamster.displayName }}</div>
        <div class="headline" v-else>Anonymous</div>
      </div>
    </v-card-title>
    <v-card-text class="pre">
      {{ post.text }}
    </v-card-text>
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
    likes() {
      return this.post.likes.length + (this.liked ? 1 : 0)
    },
    isLiked() {
      return false
    }
  },

  methods: {
    async like() {

    }
  }
}
</script>

<style scoped lang="css">
.pre {
  white-space: pre-wrap; /* Render whitespace on post content */
  word-wrap: break-word;
}
</style>
