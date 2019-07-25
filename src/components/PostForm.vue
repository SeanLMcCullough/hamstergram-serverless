<template>
  <v-form v-model="valid">
    <v-textarea
      label="What's new?"
      name="name"
      outline
      :rules="textRules"
      required
    ></v-textarea>
    <v-btn color="primary" @click="submit" :disabled="!valid" :loading="submitting">Post</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'PostForm',

  data() {
    return {
      valid: false,
      textRules: [
        v => !!v || 'You\'ve got to tell us something!'
      ],
      submitting: false
    }
  },

  methods: {
    submit() {
      this.submitting = true

      this.submitting = false
    }
  }
}
</script>

<style lang="css">
</style>
