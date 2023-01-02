<template>
  <div>
    <UiTopAppBar
      content-selector="main"
      type="dense"
      :fixed="false"
      nav-id="main-menu"
    >
      <template #default> Iliad Test </template>

      <template #toolbar="{ navIconClass }">
        <NuxtLink v-button :class="navIconClass" to="/">
          <UiIcon>home</UiIcon>
        </NuxtLink>

        <NuxtLink v-button :class="navIconClass" to="/login">
          <UiIcon>login</UiIcon>
        </NuxtLink>
      </template>
    </UiTopAppBar>

    <UiDrawer nav-id="main-menu" type="modal">
      <UiDrawerHeader>
        <UiDrawerTitle>Iliad Test</UiDrawerTitle>
      </UiDrawerHeader>

      <UiDivider></UiDivider>

      <UiDrawerContent>
        <UiNav>
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

          <UiDivider></UiDivider>

          <NuxtNavItem href="/">
            Home
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">home</UiIcon>
            </template>
          </NuxtNavItem>

          <NuxtNavItem href="/login">
            Login
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">login</UiIcon>
            </template>
          </NuxtNavItem>
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
import { version as VueVersion } from 'vue'
import { version as BalmUIVersion } from 'balm-ui'
import { version as NuxtVersion } from 'nuxt/package.json'

export default {
  data() {
    return {
      vue: VueVersion,
      nuxt: NuxtVersion,
      balmUi: BalmUIVersion,
    }
  },
}
</script>

<style scoped lang="scss">
.mdc-top-app-bar {
  .mdc-button {
    &:not(.disabled) {
      color: #fff;
    }
  }
}

.o-footer {
  text-align: center;
}

.o-heart {
  color: red;
}
</style>
