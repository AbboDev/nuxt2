<template>
  <section>
    <NuxtLink v-button.outlined to="/posts">Torna all'elenco</NuxtLink>
    <NuxtLink v-button.outlined :to="`/posts/${post.id}`"
      >Visualizza post</NuxtLink
    >

    <h1>Modifica post #{{ post.id }}</h1>

    <PostForm
      :title="post.title"
      :body="post.body"
      :tags="post.tags"
      :reactions="post.reactions"
      :post-id="post.id"
    ></PostForm>
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
