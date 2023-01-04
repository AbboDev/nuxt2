<template>
  <section class="c-posts">
    <h1>Tutti i post</h1>

    <div class="c-posts__row">
      <UiButton
        :disabled="selectedRows.length === 0"
        raised
        @click="deletePosts"
        >Elimina selezionati</UiButton
      >
    </div>

    <div class="c-posts__row c-posts__row--autocomplete">
      <UiAutocomplete
        v-model="search"
        :source="source"
        outlined
        placeholder="Ricerca i termini"
        @input="searchPostsByText"
      ></UiAutocomplete>

      <UiSelect
        v-model="user"
        outlined
        :options="users"
        default-label="Filtra per utente"
        @change="searchPostsByUser"
        >Filtra per utente</UiSelect
      >

      <UiButton raised @click="clearFilters">
        Pulisci filtri
        <template #after="{ iconClass }">
          <UiIcon :class="iconClass">delete_sweep</UiIcon>
        </template>
      </UiButton>

      <UiAlert :style="{ marginTop: '16px' }" state="help"
        >Attenzione! La ricerca viene fatto o
        <strong>solo sull'utente</strong> o
        <strong>sulla ricerca testuale</strong>.<br />L'altro campo verrà
        ignorato</UiAlert
      >
    </div>

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
        :page-size="currentLimit || 1"
        show-total
        @change="onPage"
      ></UiPagination>
    </UiTable>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

type SimpleUser = {
  id: string
  username: string
}

export default Vue.extend({
  name: 'AllPostsPage',
  middleware: 'onlyLoggedIn',
  async asyncData({ $axios }) {
    const response = await $axios.$get<
      Promise<{
        users: SimpleUser[]
      }>
    >(
      // Il valore è stato messo apposta alto per inviare tutti gli utenti insieme
      'https://dummyjson.com/users/?select=id,username&limit=100000'
    )

    return {
      users: response.users.map<UiSelectValue>((user) => {
        return {
          value: user.id.toString(),
          label: user.username,
        }
      }),
    }
  },
  data() {
    const page = this.$route.query?.page
    const search = this.$route.query?.q || ''
    const user = this.$route.query?.user || null

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
      selectedRows: [] as number[],
      page: page ? parseInt(page as string) : 1,
      currentLimit: limit,
      limit,
      total: 0,
      search,
      source: [] as string[],
      user,
      users: [] as UiSelectValue[],
      debounce: undefined as undefined | number,
    }
  },
  async fetch(): Promise<void> {
    const skip: number = this.limit * (this.page - 1)
    const searchParams: URLSearchParams = new URLSearchParams({
      limit: (this.limit || 30).toString(),
      skip: skip.toString(),
    })

    let url: URL = new URL(`https://dummyjson.com/posts/`)
    let noPostMessage: string =
      'Oh no. Sembra che non sia stato ancora pubblicato alcun post'

    const { q, user } = this.$route.query

    if (typeof q === 'string' && q) {
      noPostMessage = 'Nessun post trovato con la ricerca indicata'
      searchParams.set('q', q)
      url = new URL('./search', url)
    } else if (typeof user === 'string' && user) {
      noPostMessage = "L'utente scelto non ha pubblicato alcun post"
      url = new URL(`./user/${user}`, url)
    }

    url = new URL(`${url}?${searchParams.toString()}`)

    const fetch = await this.$axios.$get<PostsPagination>(url.toString())

    const { posts, total, limit } = fetch

    if (posts.length === 0) {
      this.$toast({
        timeoutMs: 2000,
        message: noPostMessage,
      })
    }

    this.posts = posts
    this.total = total
    this.currentLimit = limit
    this.limit = limit

    const source: string[] = this.posts.reduce<string[]>(
      (accumulator, current: Post) => {
        accumulator.push(...(current?.tags || []))
        return accumulator
      },
      this.source
    )

    // Garantisce l'univocità dei risultati
    this.source = [...new Set(source)]
  },
  watch: {
    '$route.query': function (query) {
      let refresh: boolean = false
      if (query?.page && query.page !== this.page) {
        this.page = parseInt(query.page)
        refresh = true
      }

      if (query?.q && query.q !== this.search) {
        this.search = query.q
        refresh = true
      }

      if (query?.user && query.user !== this.user) {
        this.user = query.user
        refresh = true
      }

      if (refresh) {
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
        query: { ...this.$route.query, page: page.toString() },
      })
    },
    searchPostsByText(text: string | number): void {
      if (this.debounce) {
        clearTimeout(this.debounce)
      }

      this.debounce = window.setTimeout(() => {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            page: '1',
            q: text.toString(),
            user: null,
          },
        })
      }, 250)
    },
    searchPostsByUser(user: number): void {
      if (this.debounce) {
        clearTimeout(this.debounce)
      }

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: '1',
          q: null,
          user: user.toString(),
        },
      })
    },
    clearFilters(): void {
      this.search = ''
      this.user = null
      this.limit = 30

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: '1',
          q: null,
          user: null,
        },
      })
    },
    deletePosts(): void {
      if (this.selectedRows.length === 0) {
        return
      }

      const selectedPosts: Post[] = this.posts.filter((post) =>
        this.selectedRows.includes(post.id)
      )

      selectedPosts.forEach((post) => {
        this.deletePost(post)
      })
    },
    async deletePost(post: Post): Promise<void> {
      try {
        await this.$axios.$delete(`https://dummyjson.com/posts/${post.id}`)
        this.$toast({
          message: 'Post eliminato con successo!',
          className: 'is-success',
        })

        const postIndex: number = this.posts.indexOf(post)
        if (postIndex > -1) {
          this.posts.splice(postIndex, 1)

          --this.currentLimit
          --this.total
        }

        const index = this.selectedRows.indexOf(post.id)
        if (index > -1) {
          this.selectedRows.splice(index, 1)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.$toast({
          message:
            "È avvenuto un errore durante l'eliminazione del post. Riprova",
          className: 'is-error',
        })
      }
    },
  },
})
</script>

<style lang="scss">
.mdc-autocomplete__menu {
  max-width: 100%;
  scrollbar-width: thin;

  .mdc-deprecated-list-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
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

.c-posts {
  #{&}__row {
    width: 100%;
    margin-bottom: 1rem;

    &--autocomplete {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .mdc-autocomplete {
        margin-right: 1rem;
      }

      .mdc-button {
        margin-left: auto;
      }

      .mdc-alert {
        width: 100%;
      }
    }
  }
}
</style>
