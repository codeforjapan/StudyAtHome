<template>
  <v-btn class="editorButton" width="48px" height="48px">
    <v-icon :color="iconColor">{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContentCardEditorButton',
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: false,
      default: '#0071c2'
    }
  }
})
</script>

<style lang="scss" scoped>
.editorButton {
  border-radius: 14px;
  min-width: 48px !important;
}
</style>
