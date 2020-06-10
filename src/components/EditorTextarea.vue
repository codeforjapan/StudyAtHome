<template>
  <div>
    <span v-if="title" class="EditorField-Title">{{ title }}</span>
    <div class="EditorField-Form">
      <v-textarea
        v-model="value"
        :hint="hint"
        :label="label"
        :placeholder="placeholder"
        background-color="white"
        class="elevation-0"
        solo
        flat
        outlined
      />
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
import ContentCardEditorButton from '@/components/ContentCardEditorButton.vue'

type DataType = {
  value: string
}

export default Vue.extend({
  components: { ContentCardEditorButton },
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
    iconName: {
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

  .Textarea {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  .Button {
    flex: 0 1 auto;
    margin-left: 8px;
  }
}
</style>
