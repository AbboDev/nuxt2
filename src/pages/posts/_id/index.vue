<template>
  <article class="c-post">
    <NuxtLink v-button.outlined to="/posts">Torna all'elenco</NuxtLink>
    <NuxtLink v-button.outlined :to="`/posts/${post.id}/edit`"
      >Modifica post</NuxtLink
    >
    <UiButton outlined @click="deletePost">Elimina post</UiButton>

    <h1 class="c-post__title">{{ post.title }}</h1>

    <div class="c-post__body">
      <div class="c-post__user">
        Scritto dall'utente #{{ post.userId }}<UiIcon>face</UiIcon>
      </div>

      <p>{{ post.body }}</p>

      <UiChips>
        <UiChip v-for="tag in post.tags" :key="tag">{{ tag }}</UiChip>
      </UiChips>

      <div class="c-post__reactions">
        <span v-badge="post.reactions"></span>
        <span>Reazioni ottenute finora:</span>
        <span
          v-for="index in post.reactions"
          :key="index"
          class="c-post__reactions__icon"
          >{{ getReactionIcon() }}</span
        >
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ViewPostPage',
  middleware: 'onlyLoggedIn',
  async asyncData({ $axios, params, error }) {
    try {
      const post: Post = await $axios.$get(
        `https://dummyjson.com/posts/${params.id}`
      )

      return { post }
    } catch (e) {
      error({ statusCode: 404, message: 'Post non trovato' })
    }
  },
  data() {
    return {
      post: {} as Post,
    }
  },
  methods: {
    getReactionIcon(): string {
      const reactions = ['💩', '😠', '👎', '🤔', '👀', '👍', '🤣', '🤩', '💖']

      return reactions[Math.floor(Math.random() * reactions.length)]
    },
    deletePost(): void {
      this.$axios
        .$delete(`https://dummyjson.com/posts/${this.post.id}`)
        .then(() => {
          this.$toast({
            message: 'Post eliminato con successo!',
            className: 'is-success',
          })

          this.$router.push('/posts')
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error)
          this.$toast({
            message:
              "È avvenuto un errore durante l'eliminazione del post. Riprova",
            className: 'is-error',
          })
        })
    },
  },
})
</script>

<style lang="scss">
.c-post {
  #{&}__user {
    display: flex;
    align-items: center;

    .material-icons {
      margin-left: 8px;
    }
  }

  #{&}__reactions {
    margin-top: 16px;
    display: flex;
    align-items: center;

    .mdc-badge {
      margin-right: 4px;
    }

    &__icon {
      margin-left: 4px;
    }
  }
}
</style>
