<template>
  <div>
    <span v-if="title" class="EditorTextarea-Title">{{ title }}</span>
    <v-textarea
      v-model="modelValue"
      :hint="hint"
      :label="label"
      :placeholder="placeholder"
      background-color="white"
      class="elevation-0"
      solo
      flat
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  modelValue: string
}

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    hint: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
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

<style lang="scss" scoped>
.EditorTextarea-Title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  margin-bottom: 4px;
}
</style>
