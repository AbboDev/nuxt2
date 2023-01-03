<template>
  <span :class="['o-gender', `o-gender--${gender.toLowerCase()}`]">
    <span>
      <slot>{{ gender[0].toUpperCase() + gender.substring(1) }}</slot>
    </span>
    <UiIcon class="o-gender__symbol">{{ gender.toLowerCase() }}</UiIcon>
  </span>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'GenderLabel',
  props: {
    gender: {
      default: 'male',
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
.o-gender {
  display: flex;
  align-items: center;

  &#{&}--male {
    --symbol-color: blue;
  }

  &#{&}--female {
    --symbol-color: red;
  }

  #{&}__symbol {
    margin-left: 8px;
    color: var(--symbol-color, inherit);
  }
}
</style>
