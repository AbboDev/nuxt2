<template>
  <section>
    <h1>Tutti i post</h1>

    <UiButton @click="onPage(page + 1)">Next</UiButton>

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
        <UiIcon :style="{ marginLeft: '8px' }">style</UiIcon>
      </template>

      <template #th-user>
        <UiIcon v-tooltip="'Utente'" aria-describedby="th-user">face</UiIcon>
      </template>

      <template #th-reactions>
        <UiIcon v-tooltip="'Reazioni ricevute'" aria-describedby="th-reactions">
          add_reaction
        </UiIcon>
      </template>

      <template #reactions="{ data: post }">
        <span v-badge.overlap="post.reactions">{{
          getReactionIcon(post.reactions)
        }}</span>
      </template>

      <template #actions="{ data: post }">
        <NuxtIconButton
          :href="`/posts/${post.id}`"
          icon="description"
        ></NuxtIconButton>
        <NuxtIconButton
          :href="`/posts/${post.id}/edit`"
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
        :page-size="currentLimit"
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
  data() {
    const page = this.$route.query?.page
    const limit: number = 30

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
      page: page ? parseInt(page as string) : 1,
      currentLimit: limit,
      limit,
      total: 0,
    }
  },
  async fetch(): Promise<void> {
    const skip: number = this.limit * (this.page - 1)
    const fetch = await this.$axios.$get<PostsPagination>(
      `https://dummyjson.com/posts?limit=${this.limit}&skip=${skip}`
    )

    const { posts, total, limit } = fetch

    this.posts = posts
    this.total = total
    this.currentLimit = limit
    this.limit = limit
  },
  watch: {
    '$route.query': function (query) {
      if (query?.page && query.page !== this.page) {
        this.page = parseInt(query.page)
        this.$fetch()
      }
    },
  },
  methods: {
    getReactionIcon(count: number): string {
      const reactions = [
        '🤐',
        '💩',
        '😠',
        '👎',
        '🤔',
        '👀',
        '👍',
        '🤣',
        '🤩',
        '💖',
      ]
      // return reactions[Math.floor(Math.random() * reactions.length)]

      if (count >= reactions.length) {
        count = reactions.length - 1
      } else if (count < 0) {
        count = 0
      }

      return reactions[count]
    },
    onPage(page: number): void {
      this.$router.push({
        path: this.$route.path,
        query: { page: page.toString() },
      })
    },
    deletePost(post: Post): void {
      this.$axios
        .$delete(`https://dummyjson.com/posts/${post.id}`)
        .then(() => {
          this.$toast({
            message: 'Post eliminato con successo!',
            className: 'is-success',
          })

          const index: number = this.posts.indexOf(post)
          if (index > -1) {
            this.posts.splice(index, 1)

            --this.currentLimit
          }
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
