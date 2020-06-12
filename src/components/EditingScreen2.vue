<template>
  <div>
    <editor-textarea title="学習の目的" />
    <editor-textarea title="詳細説明" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorTextarea from '@/components/EditorTextarea.vue'

export default Vue.extend({
  components: { EditorTextarea }
})
</script>
