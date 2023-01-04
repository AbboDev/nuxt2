<template>
  <div>
    <UiTopAppBar
      content-selector="main"
      type="dense"
      :fixed="false"
      nav-id="main-menu"
    >
      <template #default>{{ title }}</template>
    </UiTopAppBar>

    <UiDrawer nav-id="main-menu" type="modal">
      <UiDrawerHeader>
        <UiDrawerTitle>{{ title }}</UiDrawerTitle>
      </UiDrawerHeader>

      <UiDivider></UiDivider>

      <UiDrawerContent>
        <UiNav>
          <NuxtNavItem href="/">
            Home
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">home</UiIcon>
            </template>
          </NuxtNavItem>

          <template v-if="!isLoggedIn">
            <NuxtNavItem href="/login">
              Effettua il Login
              <template #after="{ iconClass }">
                <UiIcon :class="iconClass">login</UiIcon>
              </template>
            </NuxtNavItem>

            <NuxtNavItem href="/registration">
              Registrati ora!
              <template #after="{ iconClass }">
                <UiIcon :class="iconClass">person_add</UiIcon>
              </template>
            </NuxtNavItem>
          </template>
          <template v-else>
            <NuxtNavItem href="/add-shipment">
              Aggiungi un indirizzo di spedizione
              <template #after="{ iconClass }">
                <UiIcon :class="iconClass">local_shipping</UiIcon>
              </template>
            </NuxtNavItem>
          </template>

          <UiDivider></UiDivider>

          <UiNavItem href="https://v2.vuejs.org/" target="_blank"
            >Vue.js <code>({{ vue }})</code></UiNavItem
          >
          <UiNavItem href="https://nuxtjs.org/" target="_blank"
            >NuxtJs <code>({{ nuxt }})</code></UiNavItem
          >
          <UiNavItem href="https://v8.material.balmjs.com/" target="_blank"
            >BalmUI <code>({{ balmUi }})</code></UiNavItem
          >
          <UiNavItem href="https://dummyjson.com/" target="_blank"
            >dummyJSON</UiNavItem
          >
        </UiNav>
      </UiDrawerContent>
    </UiDrawer>

    <main>
      <Nuxt />
    </main>

    <footer class="o-footer">
      <p>
        <a v-button href="https://github.com/AbboDev" target="_blank"
          >Made with <span class="o-heart">❤</span> by AbboDev</a
        >
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import Vue, { version as VueVersion } from 'vue'
import { version as BalmUIVersion } from 'balm-ui'
import { version as NuxtVersion } from 'nuxt/package.json'

export default Vue.extend({
  data() {
    return {
      title: '',
      vue: VueVersion,
      nuxt: NuxtVersion,
      balmUi: BalmUIVersion,
    }
  },
  head() {
    return {
      changed: (info) => {
        if (info.title) {
          this.title = info.title
        }
      },
    }
  },
  computed: {
    ...mapGetters('account', ['isLoggedIn']),
  },
})
</script>

<style scoped lang="scss">
.o-footer {
  text-align: center;
}

.o-heart {
  color: red;
}
</style>
