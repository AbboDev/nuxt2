<template>
  <form action="#" class="c-login" @submit.prevent="doLogin">
    <FormSpinner :active="form.loading"></FormSpinner>

    <UiForm type="|" item-margin-bottom="16">
      <template #default="{ itemClass, subitemClass, actionClass }">
        <UiFormField :class="itemClass">
          <UiTextfield v-model="form.data.username" input-type="text" outlined>
            Username
          </UiTextfield>
        </UiFormField>

        <UiFormField :class="itemClass">
          <UiTextfield
            v-model="form.data.password"
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
          <UiButton :disabled="form.loading" native-type="submit" type="raised"
            >Effettua login</UiButton
          >
        </UiFormField>
      </template>
    </UiForm>

    <slot></slot>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginForm',
  data() {
    return {
      form: {
        data: {
          username: '',
          password: '',
        },
        remember: false,
        loading: false,
      },
    }
  },
  methods: {
    doLogin(): void {
      const data = this.form.data

      this.form.loading = true

      this.$axios
        .$post('https://dummyjson.com/auth/login', data)
        .then((response: LoginResponse) => {
          this.$store
            .dispatch({
              type: 'account/login',
              account: response,
              remember: this.form.remember,
            })
            .then(() => {
              this.$router.push('/profile')
            })
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
        .then(() => {
          this.form.loading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.c-login {
  width: 350px;
  margin: 0 auto;
  position: relative;

  .mdc-text-field {
    &,
    input {
      width: 100%;
    }
  }

  .mdc-button {
    width: 100%;
  }
}
</style>
