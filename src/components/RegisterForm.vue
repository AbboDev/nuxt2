<template>
  <form action="#" class="c-registration" @submit.prevent="register">
    <UiForm type="|">
      <template #default="{ itemClass, subitemClass, actionClass }">
        <UiGrid :style="columns">
          <UiGridCell columns="12">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="account.email"
                input-type="email"
                outlined
                required
              >
                Email
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="account.username"
                input-type="text"
                outlined
                required
              >
                Username
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <PasswordField
                v-model="account.password"
              ></PasswordField> </UiFormField
          ></UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <PasswordField v-model="form.repeatPassword"
                >Ripeti Password</PasswordField
              >
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiDivider>Dati anagrafici</UiDivider>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="account.firstName"
                input-type="text"
                outlined
                required
              >
                Nome
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="account.lastName"
                input-type="text"
                outlined
                required
              >
                Cognome
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiDatepicker
                v-model="account.birthDate"
                outlined
                :config="form.date.config"
                placeholder="Data di nascita"
                required
                toggle
                clear
              >
                <template #toggle>
                  <UiIcon>calendar_month</UiIcon>
                </template>

                <template #clear>
                  <UiIcon>close</UiIcon>
                </template>
              </UiDatepicker>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield v-model="account.birthplace" outlined required>
                Luogo di Nascita
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell
            columns="12"
            align="middle"
            :style="{ textAlign: 'center' }"
          >
            <UiFormField :class="subitemClass">
              <UiRadio
                v-model="account.gender"
                input-id="male"
                value="male"
              ></UiRadio>
              <label for="male">
                <GenderLabel gender="male">Maschio</GenderLabel>
              </label>
            </UiFormField>

            <UiFormField :class="subitemClass">
              <UiRadio
                v-model="account.gender"
                input-id="female"
                value="female"
              ></UiRadio>
              <label for="female">
                <GenderLabel gender="female">Femmina</GenderLabel>
              </label>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="account.phone"
                input-type="tel"
                outlined
                pattern="[0-9.-\s]{9,}"
              >
                Telefono
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiDivider></UiDivider>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="itemClass">
              <div :class="subitemClass">
                <UiFormField>
                  <UiCheckbox
                    v-model="form.remember"
                    input-id="remember"
                  ></UiCheckbox>
                  <label for="remember"
                    >Memorizzare il login per i prossimi accessi?</label
                  >
                </UiFormField>
              </div>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="actionClass">
              <UiButton native-type="submit" type="raised"
                >Registrati ora</UiButton
              >
            </UiFormField>
          </UiGridCell>
        </UiGrid>
      </template>
    </UiForm>

    <slot></slot>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RegisterForm',
  data() {
    const maxDate = new Date()
    // NOTE: simula la possibilità di iscriversi solo se si è maggiorenni,
    // ovvero calcolando da oggi meno diciotto anni
    maxDate.setFullYear(maxDate.getFullYear() - 18)

    return {
      columns: {
        '--mdc-layout-grid-margin-desktop': 0,
        '--mdc-layout-grid-gutter-desktop': '16px',
        '--mdc-layout-grid-margin-tablet': 0,
        '--mdc-layout-grid-margin-mobile': 0,
      },
      form: {
        repeatPassword: '',
        remember: false,
        date: {
          config: {
            enableTime: false,
            dateFormat: 'Y-m-d',
            maxDate,
          },
        },
      },
      account: {
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: 'male',
        phone: '',
        birthplace: '',
        // birthplace: {
        //   address: '',
        //   civic: null,
        //   region: '',
        //   province: '',
        //   city: '',
        //   zip: 0,
        // },
      },
    }
  },
  methods: {
    register(): void {
      const data = this.account

      if (data.password !== this.form.repeatPassword) {
        this.$toast({
          message: 'Password invalida',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })
        return
      }

      if (!data.birthDate) {
        this.$toast({
          message: 'La data di nascita è obbligatoria',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })
        return
      }

      this.$axios
        .$post('https://dummyjson.com/users/add', data)
        .then((registrationResponse: UserResponse) => {
          // const account: Account = {
          //   id: registrationResponse.id,
          //   username: registrationResponse.username,
          //   email: registrationResponse.email,
          //   firstName: registrationResponse.firstName,
          //   lastName: registrationResponse.lastName,
          //   gender: registrationResponse.gender,
          //   // phone: registrationResponse.phone,
          //   // birthDate: registrationResponse.birthDate,
          //   // // NOTE: le fake API non ritornano il seguente campo
          //   // birthplace: this.account.birthplace
          // }

          const { password, username } = registrationResponse

          const data = {
            password,
            username,
          }

          this.$toast({
            message: 'Registrazione avvenuta con successo!',
            position: 'center',
            className: 'is-success',
            timeoutMs: 3500,
          })

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
              // NOTE: si finirà sempre in questo caso perché le fake API non effettuano la registrazione
              // eslint-disable-next-line no-console
              console.error(error)

              this.$toast({
                message:
                  'È avvenuto un errore mentre veniva fatto il login. Si prega di riprovare',
                position: 'center',
                className: 'is-error',
                timeoutMs: 3500,
              })
            })
        })
        .catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(error)

          this.$toast({
            message:
              'È avvenuto un errore durante la registrazione. Si prega di riprovare',
            position: 'center',
            className: 'is-error',
            timeoutMs: 3500,
          })
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.c-registration {
  width: 480px;
  margin: 0 auto;

  .mdc-text-field {
    &,
    input {
      width: 100%;
    }
  }

  .mdc-form__actions {
    &,
    .mdc-button {
      width: 100%;
    }
  }
}
</style>
