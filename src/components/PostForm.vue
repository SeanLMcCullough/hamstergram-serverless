<template>
  <v-form v-model="valid">
    <v-textarea
      label="What's new?"
      name="name"
      outline
      :rules="textRules"
      required
      :value="text"
      @input="$emit('update:text', $event)"
    ></v-textarea>
    <v-btn color="primary" @click="$emit('submit', $event)" :disabled="!valid" :loading="submitting">Post</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'PostForm',

  props: {
    submitting: Boolean,
    text: String
  },

  data() {
    return {
      valid: false,
      textRules: [
        v => !!v || 'You\'ve got to tell us something!'
      ]
    }
  }
}
</script>

<style lang="css">
</style>
