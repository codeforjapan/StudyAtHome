<template>
  <v-btn
    class="add-button"
    :color="buttonColor"
    :width="buttonSize"
    :height="buttonSize"
    @click="onClick"
  >
    <span v-if="iconSize === 'x-small'">
      <v-icon :color="iconColor" x-small>{{ iconName }}</v-icon>
    </span>
    <span v-if="iconSize === 'small'">
      <v-icon :color="iconColor" small>{{ iconName }}</v-icon>
    </span>
    <span v-if="iconSize === 'medium'">
      <v-icon :color="iconColor" small>{{ iconName }}</v-icon>
    </span>
    <span v-if="iconSize === 'large'">
      <v-icon :color="iconColor" small>{{ iconName }}</v-icon>
    </span>
    <span v-if="iconSize === 'x-large'">
      <v-icon :color="iconColor" x-large>{{ iconName }}</v-icon>
    </span>
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
      type: String,
      required: false,
      default: 'medium',
      validator(value: string): boolean {
        return ['x-small', 'small', 'medium', 'large', 'x-large'].includes(
          value
        )
      }
    }
  },
  methods: {
    onClick(): void {
      console.log('pushed')
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
