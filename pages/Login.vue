<template>
  <section class="o-page">
    <div class="o-page__content">
      <form
        v-if="!isLoggedIn"
        action="#"
        class="c-login"
        @submit.prevent="doLogin"
      >
        <UiForm class="o-form" type="|" item-margin-bottom="16">
          <template #default="{ itemClass, subitemClass, actionClass }">
            <UiFormField :class="itemClass">
              <UiTextfield v-model="form.username" input-type="text" outlined>
                Username
              </UiTextfield>
            </UiFormField>

            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="form.password"
                outlined
                input-type="password"
                required
                pattern="[a-zA-Z0-9.@_-]{1,}"
                helper-text-id="pw-validation-msg"
                :attrs="{ autocomplete: 'current-password' }"
              >
                Password
              </UiTextfield>
            </UiFormField>

            <UiFormField :class="itemClass">
              <div :class="subitemClass">
                <UiFormField>
                  <UiCheckbox
                    v-model="form.remember"
                    input-id="remember"
                  ></UiCheckbox>
                  <label for="remember">Ricordami</label>
                </UiFormField>
              </div>
            </UiFormField>

            <UiFormField :class="actionClass">
              <UiButton native-type="submit" type="raised"
                >Effettua login</UiButton
              >
            </UiFormField>
          </template>
        </UiForm>
      </form>

      <UiCard v-else class="c-login c-login--music">
        <UiCardContent class="c-login__primary-action">
          <div class="c-login__music-row">
            <UiCardMedia
              square
              class="c-login__media c-login__media--music"
              :style="{ backgroundImage: `url('${account.image}')` }"
            ></UiCardMedia>
            <div class="c-login__music-info">
              <div :class="['c-login__music-title']">
                {{ account.username }}
              </div>
              <div class="c-login__music-artist">{{ fullName }}</div>
              <div class="c-login__music-year">{{ account.gender }}</div>
            </div>
          </div>
        </UiCardContent>

        <UiListDivider></UiListDivider>

        <UiCardActions>
          <UiButton class="o-login__action" @click.prevent="doLogout">
            Logout
            <template #after>
              <UiIcon>logout</UiIcon>
            </template>
          </UiButton>
        </UiCardActions>
      </UiCard>
    </div>
  </section>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false,
      },
    }
  },
  computed: {
    ...mapState('account', ['account']),
    ...mapGetters('account', ['isLoggedIn', 'fullName']),
  },
  methods: {
    doLogin(): void {
      const data = {
        username: this.form.username,
        password: this.form.password,
      }

      this.$axios
        .$post('https://dummyjson.com/auth/login', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response: LoginResponse) => {
          this.$store.dispatch({
            type: 'account/login',
            account: response,
            remember: this.form.remember,
          })
        })
        .catch((error: Error) => {
          console.error(error)
        })
    },
    doLogout(): void {
      this.$store.dispatch('account/logout')
    },
  },
}
</script>

<style lang="scss" scoped>
.c-login {
  $card: &;
  $card__media: #{$card}__media;
  $card__media--music: #{$card__media}--music;
  $card--music: #{$card}--music;

  width: 350px;
  margin: 48px;

  #{$card__media} {
    background-repeat: no-repeat;
  }

  #{$card--music} {
    border-radius: 24px 4px;

    @at-root [dir='rtl'] {
      border-radius: 4px 24px;
    }
  }
}

.c-login__music-row {
  display: flex;
  border-top-left-radius: inherit;

  @at-root [dir='rtl'] {
    border-top-left-radius: 0;
    border-top-right-radius: inherit;
  }
}

.c-login__media--music {
  width: 110px;
  border-top-left-radius: inherit;

  @at-root [dir='rtl'] {
    border-top-left-radius: 0;
    border-top-right-radius: inherit;
  }
}

.c-login__music-info {
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
}

.c-login__action-buttons--text-only {
  margin-left: 8px;
}

.c-login__action-icon--star {
  margin-left: 4px;
  margin-right: 4px;
  cursor: pointer;
}
</style>
