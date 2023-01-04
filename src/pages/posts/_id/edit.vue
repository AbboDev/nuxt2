<template>
  <section>
    <NuxtLink v-button.outlined to="/posts">Torna all'elenco</NuxtLink>
    <NuxtLink v-button.outlined :to="`/posts/${post.id}`"
      >Visualizza post</NuxtLink
    >

    <h1>{{ post.title }} <small>(Modifica)</small></h1>

    <pre>{{ post }}</pre>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ViewPostPage from './index.vue'

export default Vue.extend({
  name: 'EditPostPage',
  extends: ViewPostPage,
})
</script>
