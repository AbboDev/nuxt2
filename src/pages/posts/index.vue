<template>
  <section>
    <h1>Tutti i post</h1>

    <UiTable
      v-model="selectedRows"
      fullwidth
      :data="posts"
      :thead="thead"
      :tbody="tbody"
      row-checkbox
      selected-key="id"
    >
      <template #th-tags>
        Tags
        <UiIcon>style</UiIcon>
      </template>

      <template #th-user>
        <UiIcon v-tooltip="'Utente'" aria-describedby="th-user"> face </UiIcon>
      </template>

      <template #th-reactions>
        <UiIcon v-tooltip="'Reazioni ricevute'" aria-describedby="th-reactions">
          add_reaction
        </UiIcon>
      </template>

      <template #reactions="{ data: post }">
        <span v-if="post.reactions" v-badge.overlap="post.reactions">{{
          getRandomReaction()
        }}</span>
        <span
          v-else
          v-tooltip="'Ancora nessuna reazione'"
          aria-describedby="reactions"
          >🤐</span
        >
      </template>

      <template #actions="{ data: post }">
        <NuxtIconButton
          :href="`/posts/${post.id}`"
          icon="description"
        ></NuxtIconButton>
        <NuxtIconButton
          :href="`/posts/${post.id}`"
          icon="edit"
        ></NuxtIconButton>
        <UiIconButton
          icon="delete"
          @click.prevent="deletePost(post)"
        ></UiIconButton>
      </template>

      <UiPagination
        v-if="total > 1"
        v-model="page"
        :total="total"
        show-total
        @change="onPage"
      ></UiPagination>
    </UiTable>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AllPostsPage',
  middleware: 'onlyLoggedIn',
  async asyncData({ $axios }) {
    const fetch = await $axios.$get('https://dummyjson.com/posts')

    // TODO: creare tipo per destrutturare risultato
    const posts: Post[] = fetch.posts
    const total: number = fetch.total

    return { posts, total }
  },
  data() {
    return {
      posts: [] as Post[],
      thead: [
        {
          value: 'ID',
          sort: 'asc',
          columnId: 'id',
        },
        'Titolo',
        {
          slot: 'th-user',
          sort: 'asc',
          columnId: 'user',
        },
        {
          slot: 'th-tags',
          sort: 'none',
          columnId: 'tags',
        },
        {
          slot: 'th-reactions',
          sort: 'asc',
          columnId: 'reactions',
        },
        'Azioni',
      ],
      tbody: [
        {
          field: 'id',
          class: 'has-order',
        },
        'title',
        {
          field: 'userId',
          class: 'has-order',
        },
        {
          field: 'tags',
          fn: (post: Post) => {
            return post.tags?.join(', ')
          },
        },
        {
          field: 'reactions',
          numeric: true,
          class: 'has-order is-reaction',
          slot: 'reactions',
        },
        {
          slot: 'actions',
          class: 'is-actions',
        },
      ],
      selectedRows: [],
      page: 1,
      perPage: 1,
      total: 12,
    }
  },
  methods: {
    getRandomReaction(): string {
      const reactions = ['💖', '🤣', '👀', '👍', '👎', '🤔', '😠', '🤩']

      return reactions[Math.floor(Math.random() * reactions.length)]
    },
    onPage(page: number): void {
      console.debug(page)
    },
    deletePost(post: Post): void {
      console.debug(post)
    },
  },
})
</script>

<style lang="scss">
.mdc-data-table {
  .mdc-data-table__cell {
    &.has-order {
      padding-left: 16px + 48px;
      text-align: center;
    }

    &.is-actions {
      user-select: none;
      text-overflow: clip;
    }

    &.is-reaction {
      user-select: none;

      .mdc-badge__sup {
        font-size: 10px;
        height: 16px;
        line-height: 16px;
        padding: 0 5px;
      }
    }
  }
}
</style>
