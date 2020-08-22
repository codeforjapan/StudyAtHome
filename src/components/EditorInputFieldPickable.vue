<template>
  <div>
    <span v-if="title" class="EditorField-Title">{{ title }}</span>
    <div class="EditorField-Form">
      <editor-input-field
        :value="value"
        :label="label"
        :placeholder="placeholder"
        :transparent="transparent"
        :readonly="readonly"
        @input="$emit('input', $event)"
      />
      <base-editor-button
        v-if="iconName"
        class="Button"
        :icon-name="iconName"
        @click="$emit('clickButton')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorInputField from '@/components/EditorInputField.vue'
import BaseEditorButton from '@/components/BaseEditorButton.vue'

export default Vue.extend({
  components: { EditorInputField, BaseEditorButton },
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
    transparent: {
      type: Boolean,
      required: false,
      default: false
    },
    iconName: {
      type: String,
      required: false,
      default: ''
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false
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
.EditorField-Title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  margin-bottom: 4px;
}
.EditorField-Form {
  display: flex;

  .Button {
    flex: 0 1 auto;
    margin-left: 8px;
  }
}
</style>
