<template>
  <section class="o-page">
    <div class="o-page__content">
      <LoginCard>
        <UiNav>
          <NuxtNavItem href="/profile">
            Vedi il tuo profilo
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">perm_identity</UiIcon>
            </template>
          </NuxtNavItem>
          <NuxtNavItem href="/add-shipment">
            Aggiungi un indirizzo di spedizione
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">local_shipping</UiIcon>
            </template>
          </NuxtNavItem>
          <NuxtNavItem href="/posts">
            Vedi gli ultimi articoli
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">feed</UiIcon>
            </template>
          </NuxtNavItem>
          <NuxtNavItem href="/posts/new">
            Crea un articolo
            <template #after="{ iconClass }">
              <UiIcon :class="iconClass">library_add</UiIcon>
            </template>
          </NuxtNavItem>
        </UiNav>
      </LoginCard>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfilePage',
  middleware: 'onlyLoggedIn',
})
</script>
