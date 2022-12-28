<template>
  <section class="o-page">
    <form action="#" @submit.prevent="doLogin">
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
              pattern="[a-zA-Z0-9\.\@_-]{1,}"
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
                  :value="form.remember"
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
  </section>
</template>

<script lang="ts">
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: '',
      },
    }
  },
  methods: {
    doLogin() {
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
        .then((response) => {
          console.debug(response)
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
