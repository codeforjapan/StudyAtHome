<template>
  <v-text-field
    v-model="modelValue"
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
  />
</template>

<script lang="ts">
import Vue from 'vue'
type DataType = {
  modelValue: string
}
export default Vue.extend({
  name: 'InputField',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    hint: {
      type: String,
      required: false,
      default: ''
    },
    require: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  data(): DataType {
    return {
      modelValue: this.value
    }
  },
  watch: {
    modelValue(value) {
      this.$emit('input', value)
    },
    value(value) {
      this.modelValue = value
    }
  }
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
