<template>
  <div>
    <editor-field
      title="教科書ページ"
      label="textbook_page"
      placeholder="例）10〜14ページ"
    />
    <editor-field
      title="副教材タイトル"
      label="sub_text"
      placeholder="例）やさしい理科教材"
    />
    <editor-field
      title="副教材URL"
      label="sub_text_url"
      placeholder="https://"
      icon-name="mdi-link"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorField from '@/components/EditorField.vue'

export default Vue.extend({
  components: { EditorField }
})
</script>
