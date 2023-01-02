<template>
  <form action="#" class="c-login" @submit.prevent="doLogin">
    <UiForm type="|" item-margin-bottom="16">
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
          <UiButton native-type="submit" type="raised">Effettua login</UiButton>
        </UiFormField>
      </template>
    </UiForm>

    <slot></slot>
  </form>
</template>

<script lang="ts">
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: false,
      },
    }
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
          // eslint-disable-next-line no-console
          console.error(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.c-login {
  width: 350px;
  margin: 0 auto;

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
