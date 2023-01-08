<template>
  <div :class="className" @click="handleClick">
    <span
      v-if="hasRipple"
      :class="deprecatedListClassNameMap['mdc-list-item__ripple']"
    ></span>
    <slot name="before" :icon-class="UI_ITEM.cssClasses.firstTile"></slot>
    <slot>
      <!-- text content -->
    </slot>
    <slot name="after" :icon-class="UI_ITEM.cssClasses.lastTile"></slot>
  </div>
</template>

<script>
import UiItem from 'balm-ui/src/scripts/components/list/item.vue'
import { UI_ITEM } from 'balm-ui/src/scripts/components/list/constants'
import Vue from 'vue'
import Logout from '@/mixins/Logout'

export default Vue.extend({
  name: 'LogoutNavItem',
  extends: UiItem,
  mixins: [Logout],
  methods: {
    handleClick(event) {
      this.doLogout()
      this.$emit(UI_ITEM.EVENT.CLICK, event)
    },
  },
})
</script>
