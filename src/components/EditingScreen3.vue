<template>
  <div>
    <editor-field
      title="参考動画URL"
      label="video"
      placeholder="https://"
      icon-name="mdi-link"
    />
    <video-thumbnail
      title="動画サムネイル・キャプション表示"
      thumbnail-url="http://img.youtube.com/vi/1o6Dg8OOJB8/sddefault.jpg"
      caption="動画のキャプションが入ります"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorField from '@/components/EditorField.vue'
import VideoThumbnail from '@/components/VideoThumbnail.vue'

export default Vue.extend({
  components: { EditorField, VideoThumbnail }
})
</script>
