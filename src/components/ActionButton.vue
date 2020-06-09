<template>
  <button :class="`ActionButton ActionButton-${theme}`" @click="onClick">
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

type Theme = 'primary' | 'secondary' | 'border' | 'transparent'

export default Vue.extend({
  props: {
    theme: {
      type: String as () => Theme,
      required: false,
      default: 'primary'
    },
    text: {
      type: String,
      required: true,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.ActionButton {
  width: 100%;
  border-radius: 3em;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 16px;

  &-primary {
    background-color: $color-yellow;
    color: $color-gray;
  }

  &-secondary {
    background-color: $color-white;
    color: $color-gray;
  }

  &-border {
    border: 1px solid $color-base-color-01;
    color: $color-base-color-01;
    box-shadow: none;
  }

  &-transparent {
    border: 1px solid $color-white;
    color: $color-white;
    box-shadow: none;
  }
}
</style>
