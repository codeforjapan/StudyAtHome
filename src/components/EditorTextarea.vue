<template>
  <div>
    <span v-if="title" class="EditorTextarea-Title">{{ title }}</span>
    <v-textarea
      :value="value"
      :hint="hint"
      :label="label"
      :placeholder="placeholder"
      background-color="white"
      class="elevation-0"
      solo
      flat
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
