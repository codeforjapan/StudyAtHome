<template>
  <v-text-field
    :value="value"
    :color="transparent ? 'white' : '#424242'"
    type="text"
    :hint="hint"
    :label="label"
    :placeholder="placeholder"
    :background-color="transparent ? 'transparent' : 'white'"
    :readonly="readonly"
    class="elevation-0"
    solo
    flat
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'InputField',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
      default: '',
    },
    hint: {
      type: String,
      required: false,
      default: '',
    },
    require: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
  },
})
</script>

<style lang="scss">
.v-text-field > .v-input__control > .v-input__slot {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 14px !important;

  &.transparent {
    border: 2px solid $color-white !important;

    input {
      color: $color-white !important;
    }
  }
}
</style>
