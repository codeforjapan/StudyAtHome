<template>
  <div>
    <editor-field
      title="参考動画URL"
      label="video"
      placeholder="https://"
      icon-name="mdi-link"
    />
    <editor-textarea title="動画サムネイル・キャプション表示" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorField from '@/components/EditorField.vue'
import EditorTextarea from '@/components/EditorTextarea.vue'

export default Vue.extend({
  components: { EditorField, EditorTextarea }
})
</script>
