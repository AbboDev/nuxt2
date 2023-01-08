<template>
  <UiCard v-if="account" class="c-account">
    <UiCardContent class="c-account__primary-action">
      <div class="c-account__main">
        <UiCardMedia
          square
          class="c-account__media"
          :style="{ backgroundImage: `url('${account.image}')` }"
        ></UiCardMedia>
        <div class="c-account__info">
          <h3 class="c-account__info__username">
            {{ account.username }}
          </h3>

          <div class="c-account__info__name">
            <GenderLabel :gender="account.gender">{{ fullName }}</GenderLabel>
          </div>
        </div>
      </div>
    </UiCardContent>

    <UiDivider v-if="$slots.default"></UiDivider>

    <slot></slot>

    <UiDivider></UiDivider>

    <UiCardActions class="c-account__actions">
      <UiButton class="c-account__action" @click.prevent="doLogout">
        Logout
        <template #after>
          <UiIcon>logout</UiIcon>
        </template>
      </UiButton>
    </UiCardActions>
  </UiCard>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
import Vue from 'vue'
import Logout from '@/mixins/Logout'

export default Vue.extend({
  name: 'LoginCard',
  mixins: [Logout],
  computed: {
    ...mapState('account', ['account']),
    ...mapGetters('account', ['fullName']),
  },
})
</script>

<style lang="scss" scoped>
.c-account {
  $card: &;
  $card__main: #{$card}__main;
  $card__info: #{$card}__info;
  $card__info__username: #{$card__info}__username;
  $card__info__name: #{$card__info}__name;
  $card__info__gender: #{$card__info}__gender;

  $card__media: #{$card}__media;
  $card__actions: #{$card}__actions;
  $card__action: #{$card}__action;

  width: 350px;
  border-radius: 24px 4px;
  margin: 0 auto;

  @at-root [dir='rtl'] {
    border-radius: 4px 24px;
  }

  #{$card__main} {
    display: flex;
    border-top-left-radius: inherit;

    @at-root [dir='rtl'] {
      border-top-left-radius: 0;
      border-top-right-radius: inherit;
    }
  }

  #{$card__media} {
    background-repeat: no-repeat;
    width: 110px;
    border-top-left-radius: inherit;

    @at-root [dir='rtl'] {
      border-top-left-radius: 0;
      border-top-right-radius: inherit;
    }
  }

  #{$card__actions} {
    #{$card__action} {
      justify-content: space-between;
      flex: 1 1 auto;
    }
  }
}
</style>
