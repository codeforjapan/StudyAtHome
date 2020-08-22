<template>
  <v-btn
    class="editorButton"
    width="48px"
    height="48px"
    @click="$emit('click')"
  >
    <v-icon :color="iconColor" :size="iconSize">{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseEditorButton',
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: false,
      default: '#0071c2'
    },
    iconSize: {
      type: [String, Number],
      required: false,
      default: '24px'
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
