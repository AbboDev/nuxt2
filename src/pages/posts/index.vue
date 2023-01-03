<template>
  <section>
    <h1>Tutti i post</h1>

    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="`/posts/${post.id}`">{{ post.title }}</NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllPostsPage',
  middleware: 'onlyLoggedIn',
  async asyncData({ $axios }) {
    const posts: Post[] = await $axios
      .$get('https://dummyjson.com/posts')
      .then((data) => data.posts)
    return { posts }
  },
  data() {
    return {
      posts: [] as Post[],
    }
  },
})
</script>
