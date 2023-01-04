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
                @change="onChangeProvince($event)"
              >
                Provincia
              </UiSelect>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiSelect
                v-model="shipment.city"
                :options="form.cities"
                outlined
                required
                :disabled="form.cities.length <= 0"
                @change="onChangeCity($event)"
              >
                Città
              </UiSelect>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="6">
            <UiFormField :class="itemClass">
              <UiSelect
                v-model="shipment.zip"
                :options="zipCodes"
                outlined
                required
                :disabled="zipCodes.length <= 0"
              >
                CAP
              </UiSelect>
            </UiFormField>
          </UiGridCell>

          <UiGridCell columns="12">
            <UiFormField :class="actionClass">
              <UiButton native-type="submit" type="raised"
                >Salva il tuo indirizzo di spedizione
                <template #after="{ iconClass }">
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

interface UiSelectCity {
  [key: string]: UiSelectValue[]
}

const PROVINCES: UiSelectValue[][] = []
const CITIES: UiSelectCity = {}

export default Vue.extend({
  name: 'ShipmentForm',
  data() {
    let email: string = ''
    let firstName: string = ''
    let lastName: string = ''

    const country: string = 'Italia'
    const regions: UiSelectValue[] = []
    const provinces: UiSelectValue[] = []
    const cities: UiSelectValue[] = []

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
        regions,
        provinces,
        cities,
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
        province: '',
        city: 0,
        zip: '',
      },
    }
  },
  async fetch() {
    const regioni = await this.$axios
      .get('http://localhost:3030/regions')
      .then<Region[]>(({ data }) => data)

    const regions: UiSelectValue[] = regioni.map((regione: Region) => {
      return {
        value: regione.id,
        label: regione.nome,
      }
    })

    this.form.regions = regions
  },
  computed: {
    ...mapState('account', {
      accountId: (state: any): number | null => {
        return (state as AccountState).account?.id || null
      },
    }),
    zipCodes(): string[] | UiSelectValue[] {
      const currentCity: UiSelectValue | undefined = this.form.cities.find(
        (city) => city.value === this.shipment.city
      )

      if (!currentCity) {
        return []
      }

      const zipCodes: string[] = currentCity.meta?.cap || []

      if (!zipCodes.length) {
        return zipCodes
      }

      return zipCodes.map<UiSelectValue>((zip: string) => {
        return {
          value: zip,
          label: zip,
        }
      })
    },
  },
  methods: {
    cleanup(province = false): void {
      if (province) {
        this.form.provinces = []
        this.shipment.province = ''
      }

      this.form.cities = []
      this.shipment.city = 0

      this.shipment.zip = ''
    },
    async onChangeRegion(value: number): Promise<void> {
      const key: number = value || -1

      if (key === -1) {
        return
      }

      const currentRegion: UiSelectValue | undefined = this.form.regions.find(
        (element) => element.value === key
      )

      this.cleanup(true)

      if (!currentRegion) {
        this.$toast({
          message: 'La regione selezionata non esiste',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })

        return
      }

      let provinces: UiSelectValue[] | null = key > -1 ? PROVINCES[key] : null
      if (!provinces) {
        if (key <= -1) {
          return
        }

        const province = await this.$axios
          .get(`http://localhost:3030/regions/${key}/provinces`)
          .then<Province[]>(({ data }) => data)

        if (province.length <= 0) {
          return
        }

        provinces = province.map((provincia: Province): UiSelectValue => {
          return {
            value: provincia.sigla,
            label: provincia.nome,
          }
        })

        PROVINCES[key] = provinces
      }

      this.form.provinces = provinces

      this.shipment.province = provinces.length
        ? (provinces[0].value as string)
        : ''
    },
    async onChangeProvince(key: string): Promise<void> {
      if (!key) {
        this.cleanup()

        return
      }

      const currentProvince: UiSelectValue | undefined =
        this.form.provinces.find((element) => element.value === key)
      if (!currentProvince) {
        this.$toast({
          message: 'La provincia selezionata non esiste',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })

        return
      }

      let cities: UiSelectValue[] | null = CITIES[key]
      if (!cities || cities.length === 0) {
        const rawCities = await this.$axios
          .get(`http://localhost:3030/cities/?sigla=${key}`)
          .then<City[]>(({ data }) => data)

        if (rawCities.length <= 0) {
          return
        }

        cities = rawCities.map((city: City): UiSelectValue => {
          return {
            value: city.codice,
            label: city.nome,
            meta: {
              cap: city.cap,
            },
          }
        })

        CITIES[key] = cities
      }

      this.form.cities = cities

      if (!cities.length) {
        this.$toast({
          message: 'Nessuna città trovata per la provincia selezionata',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })
        this.shipment.city = 0

        return
      }

      const currentCity: UiSelectValue = cities[0]
      this.shipment.city = currentCity.value as number
      this.shipment.zip = currentCity.meta?.cap[0]
    },
    onChangeCity(cityCode: string): void {
      const currentCity: UiSelectValue | undefined = this.form.cities.find(
        (city) => city.value === cityCode
      )

      if (!currentCity) {
        this.$toast({
          message: 'La città selezionata non esiste',
          position: 'center',
          className: 'is-error',
          timeoutMs: 3500,
        })

        return
      }

      this.shipment.zip = currentCity.meta?.cap[0]
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
          // eslint-disable-next-line no-console
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
