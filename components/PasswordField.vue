<template>
  <UiTextfield
    outlined
    required
    pattern="[a-zA-Z0-9.@_-]{1,}"
    helper-text-id="pw-validation-msg"
    :input-type="isPasswordShowed ? 'text' : 'password'"
    :attrs="{ autocomplete: 'current-password' }"
    :model="value"
    @input="handleInput"
  >
    <slot>Password</slot>

    <template #after>
      <UiTextfieldIcon @click="showPassword">{{
        isPasswordShowed ? 'visibility_off' : 'visibility'
      }}</UiTextfieldIcon>
    </template>
  </UiTextfield>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },

    // isPasswordShowed: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      isPasswordShowed: false,
    }
  },
  methods: {
    showPassword(): void {
      this.isPasswordShowed = !this.isPasswordShowed
    },
    handleInput(newPassword: string): void {
      this.$emit('input', newPassword)
    },
  },
})
</script>
