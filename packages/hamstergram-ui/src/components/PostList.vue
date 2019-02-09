<template>
  <v-list two-line>
    <v-list-tile avatar v-for="post of posts" :key="post._id">
      <v-list-tile-avatar>
        <img src="src">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>title</v-list-tile-title>
        <v-list-tile-sub-title>subTitle</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'PostList',

  props: {
    posts: Array
  }
}
</script>

<style lang="css">
</style>
