<template>
  <div>
    <span v-if="title" class="EditorField-Title">{{ title }}</span>
    <div class="EditorField-Form">
      <subject-tag :background-color="subjectColor" :name="subjectName" />
      <base-editor-button
        v-if="iconName"
        class="Button"
        :icon-name="iconName"
        @click="$emit('clickPickerButton')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseEditorButton from '@/components/BaseEditorButton.vue'
import SubjectTag from '@/components/SubjectTag.vue'

export default Vue.extend({
  components: { SubjectTag, BaseEditorButton },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    iconName: {
      type: String,
      required: false,
      default: ''
    },
    subjectName: {
      type: String,
      required: false,
      default: ''
    },
    subjectColor: {
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
  align-items: center;

  .Button {
    flex: 0 1 auto;
    margin-left: 8px;
  }
}
</style>
