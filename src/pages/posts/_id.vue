<template>
  <section>
    <h1>Singolo Post</h1>
    <NuxtLink to="/posts">Tutti i post</NuxtLink>

    <pre>{{ post }}</pre>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SinglePostPage',
  middleware: 'onlyLoggedIn',
  async asyncData({ $axios, params }) {
    const post: Post = await $axios.$get(
      `https://dummyjson.com/posts/${params.id}`
    )
    return { post }
  },
  data() {
    return {
      post: {} as Post,
    }
  },
})
</script>
