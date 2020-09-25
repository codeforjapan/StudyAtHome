<template>
  <div>
    <span v-if="title" class="VideoThumbnail-Title">{{ title }}</span>
    <div class="VideoThumbnail">
      <img :src="thumbnailUrl" :alt="caption" />
      <span class="caption">{{ caption }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      required: false,
      default: '',
    },
    caption: {
      type: String,
      required: false,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.VideoThumbnail-Title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  margin-bottom: 4px;
}
.VideoThumbnail {
  border: 2px solid $color-white;
  border-radius: 14px;
  padding: 16px;

  img {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
  }

  .caption {
    display: block;
    color: $color-white;
    font-size: 14px;
    padding: 8px 0;
  }
}
</style>
