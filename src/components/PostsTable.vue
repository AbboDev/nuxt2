<template>
  <UiTable
    v-model="inner.selectedRows"
    fullwidth
    :data="posts"
    :thead="thead"
    :tbody="tbody"
    row-checkbox
    selected-key="id"
    @selected="handleSelected"
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
      <slot name="actions" :post="post"></slot>
    </template>

    <UiPagination
      v-if="total > 1"
      v-model="inner.page"
      :total="total"
      :page-size="currentLimit || 1"
      show-total
      @change="handlePageChange"
    ></UiPagination>
  </UiTable>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    selectedRows: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    currentLimit: {
      type: Number,
      default: 30,
    },
    limit: {
      type: Number,
      default: 30,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      inner: {
        posts: this.posts as Post[],
        selectedRows: this.selectedRows as number[],
        page: this.page,
      },
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
    }
  },
  methods: {
    handleSelected() {
      this.$emit('selected', this.inner.selectedRows)
    },
    handlePageChange() {
      this.$emit('page-change', this.inner.page)
    },
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

      if (count >= reactions.length) {
        count = reactions.length - 1
      } else if (count < 0) {
        count = 0
      }

      return reactions[count]
    },
  },
})
</script>
