<template>
  <UiCard class="c-login">
    <UiCardContent class="c-login__primary-action">
      <div class="c-login__main">
        <UiCardMedia
          square
          class="c-login__media"
          :style="{ backgroundImage: `url('${account.image}')` }"
        ></UiCardMedia>
        <div class="c-login__info">
          <h3 class="c-login__info__username">
            {{ account.username }}
          </h3>

          <div class="c-login__info__name">
            <span>{{ fullName }}</span>
            <UiIcon
              v-if="account.gender"
              :class="[
                'c-login__info__gender',
                `c-login__info__gender--${account.gender}`,
              ]"
              >{{ account.gender }}</UiIcon
            >
          </div>
        </div>
      </div>
    </UiCardContent>

    <UiListDivider></UiListDivider>

    <UiCardActions class="c-login__actions">
      <UiButton class="c-login__action" @click.prevent="doLogout">
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

export default {
  name: 'LoginCard',
  computed: {
    ...mapState('account', ['account']),
    ...mapGetters('account', ['fullName']),
  },
  methods: {
    doLogout(): void {
      this.$store.dispatch('account/logout')
    },
  },
}
</script>

<style lang="scss" scoped>
.c-login {
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

  #{$card__info} {
    #{$card__info__gender} {
      &#{$card__info__gender}--male {
        color: blue;
      }

      &#{$card__info__gender}--female {
        color: red;
      }
    }

    #{$card__info__name} {
      display: flex;
      align-items: center;

      span {
        & + #{$card__info__gender} {
          margin-left: 8px;
        }
      }
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
