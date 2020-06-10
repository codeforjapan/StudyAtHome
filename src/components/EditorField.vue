<template>
  <div>
    <span v-if="title" class="EditorField-Title">{{ title }}</span>
    <div class="EditorField-Form">
      <input-field :label="label" :placeholder="placeholder" />
      <content-card-editor-button
        v-if="iconName"
        class="Button"
        :icon-name="iconName"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InputField from '@/components/InputField.vue'
import ContentCardEditorButton from '@/components/ContentCardEditorButton.vue'

export default Vue.extend({
  components: { InputField, ContentCardEditorButton },
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
    iconName: {
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
