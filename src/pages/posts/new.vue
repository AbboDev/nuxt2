<template>
  <section>
    <NuxtLink v-button.outlined to="/posts">Torna all'elenco</NuxtLink>

    <h1>Nuovo post</h1>

    <PostForm @saved="redirectToNew"></PostForm>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ViewPostPage from './index.vue'

export default Vue.extend({
  name: 'CreatePostPage',
  extends: ViewPostPage,
  methods: {
    redirectToNew(post: Post) {
      this.$toast({
        message: 'Il post è stato creato con successo',
        className: 'is-success',
      })

      this.$router.push(`/posts/${post.id}/`)
    },
  },
})
</script>
