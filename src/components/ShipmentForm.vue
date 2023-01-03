<template>
  <form action="#" class="c-shipment" @submit.prevent="createShipmentAddress">
    <UiForm type="|">
      <template #default="{ itemClass, /* subitemClass,  */ actionClass }">
        <UiGrid :style="columns">
          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield
                :model="shipment.firstName"
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
                :model="shipment.lastName"
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
              <UiTextfield
                :model="shipment.email"
                input-type="email"
                outlined
                required
              >
                Email
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="shipment.phone"
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
              <UiTextfield v-model="shipment.country" outlined disabled>
                Stato
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="itemClass">
              <UiTextfield v-model="shipment.address" outlined required>
                Indirizzo
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="itemClass">
              <UiTextfield v-model="shipment.apartment" outlined required>
                Interno
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiSelect
                v-model="shipment.region"
                :options="form.regions"
                outlined
                required
                default-label="Regione"
                @change="onChangeRegion($event)"
              >
                Regione
              </UiSelect>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiSelect
                v-model="shipment.province"
                :options="form.provinces"
                outlined
                required
                :disabled="form.provinces.length <= 0"
                default-label="Provincia"
              >
                Provincia
              </UiSelect>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield v-model="shipment.city" outlined required>
                Città
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiTextfield
                v-model="shipment.zip"
                input-type="number"
                :min="0"
                outlined
                required
              >
                CAP
              </UiTextfield>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="actionClass">
              <UiButton native-type="submit" type="raised"
                >Salva il tuo indirizzo di spedizione
                <template #after="{ iconClass }">
                  <!-- Custom SVG -->
                  <UiIcon :class="iconClass">local_shipping</UiIcon>
                </template></UiButton
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
import { mapState } from 'vuex'
import { AccountState } from '@/store/account'

const PROVINCES: UiSelectValue[][] = [
  [],
  [
    {
      value: 11,
      label: 'Haiding',
    },
    {
      value: 12,
      label: 'Chaoyang',
    },
  ],
  [
    {
      value: 21,
      label: 'Huangpu',
    },
    {
      value: 22,
      label: 'Xuhui',
    },
  ],
  [
    {
      value: 31,
      label: 'Guangzhou',
    },
  ],
]

export default Vue.extend({
  name: 'ShipmentForm',
  data() {
    let email: string = ''
    let firstName: string = ''
    let lastName: string = ''

    const country: string = 'Italia'
    const provinces: UiSelectValue[] = []

    const { account } = this.$store.state.account as AccountState

    if (account) {
      ;({ email, firstName, lastName } = account)
    }

    return {
      columns: {
        '--mdc-layout-grid-margin-desktop': 0,
        '--mdc-layout-grid-gutter-desktop': '16px',
        '--mdc-layout-grid-margin-tablet': 0,
        '--mdc-layout-grid-margin-mobile': 0,
      },
      form: {
        regions: [
          {
            value: 1,
            label: 'Beijing',
          },
          {
            value: 2,
            label: 'Shanghai',
          },
          {
            value: 3,
            label: 'Guangzhou',
          },
        ],
        provinces,
      },
      shipment: {
        firstName,
        lastName,
        email,
        phone: '',
        country,
        address: '',
        apartment: '',
        region: 0,
        province: 0,
        city: '',
        zip: '',
      },
    }
  },
  computed: {
    ...mapState('account', {
      accountId: (state: any): number | null => {
        return (state as AccountState).account?.id || null
      },
    }),
  },
  methods: {
    onChangeRegion(value: number): void {
      const key: number = value || -1
      const currentRegion = this.form.regions.find(
        (element) => element.value === key
      )

      if (!currentRegion) {
        if (key > -1) {
          this.$toast({
            message: 'La regione selezionata non esiste',
            position: 'center',
            className: 'is-error',
            timeoutMs: 3500,
          })
        } else {
          this.form.provinces = []
          this.shipment.province = 0
        }

        return
      }

      const provinces = key > -1 ? PROVINCES[key] : []
      if (!provinces) {
        return
      }

      this.form.provinces = provinces

      this.shipment.province = provinces.length ? provinces[0].value : 0
    },
    createShipmentAddress(): void {
      const data = this.shipment

      if (!this.accountId) {
        this.$toast({
          message:
            'Credenziali non valide. Si prega di effettuare nuovamente il login',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })

        return
      }

      this.$axios
        .$put(`https://dummyjson.com/users/${this.accountId}`, data)
        .then((registrationResponse: UserResponse) => {
          console.debug(registrationResponse)

          this.$toast({
            message: 'Registrazione avvenuta con successo!',
            position: 'center',
            className: 'is-success',
            timeoutMs: 3500,
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
.c-shipment {
  width: 480px;
  margin: 0 auto;

  .mdc-select {
    width: 100%;
  }

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
