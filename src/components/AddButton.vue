<template>
  <v-btn
    class="add-button"
    :color="buttonColor"
    :width="buttonSize"
    :height="buttonSize"
    @click="onClick"
  >
    <v-icon :size="iconSize" :color="iconColor">{{ iconName }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddButton',
  props: {
    buttonColor: {
      type: [String, Number],
      required: false,
      default: '#FFDB6C'
    },
    buttonSize: {
      type: [String, Number],
      required: false,
      default: '48px'
    },
    iconName: {
      type: String,
      required: false,
      default: 'mdi-plus'
    },
    iconColor: {
      type: [String, Number],
      required: false,
      default: '#004170'
    },
    iconSize: {
      type: [String, Number],
      required: false,
      default: '40'
    }
  },
  methods: {
    onClick(): void {
      this.$emit('addButtonClicked')
    }
  }
})
</script>

<style lang="scss" scoped>
.add-button {
  border-radius: 14px 14px 0 14px;
  min-width: 48px !important;
}
</style>
