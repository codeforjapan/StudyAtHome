<template>
  <div>
    <span v-if="title" class="EditorField-Title">{{ title }}</span>
    <v-textarea
      v-model="value"
      :hint="hint"
      :label="label"
      :placeholder="placeholder"
      background-color="white"
      class="Textarea"
      solo
      flat
      outlined
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  value: string
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
    }
  },
  data(): DataType {
    return {
      value: ''
    }
  }
})
</script>

<style lang="scss">
.EditorField-Title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  margin-bottom: 4px;
}
.v-input__slot {
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
