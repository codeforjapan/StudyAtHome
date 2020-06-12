<template>
  <v-btn
    :class="`ActionButton ActionButton-${theme}`"
    :disabled="isDisabled"
    :loading="isLoading"
    rounded
    @click="onClick"
  >
    <span>{{ text }}</span>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

type Theme = 'primary' | 'secondary' | 'border' | 'transparent'

@Component
export default class ActionButton extends Vue {
  @Prop({ default: 'primary' })
  theme!: Theme

  @Prop({ default: '' })
  text!: string | undefined

  @Prop({ default: false })
  isDisabled?: boolean

  @Prop({ default: false })
  isLoading?: boolean

  onClick(): void {
    this.$emit('onClick')
  }
}
</script>

<style lang="scss" scoped>
.ActionButton {
  width: 100%;
  height: auto !important;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 16px !important;

  &::before {
    background-color: inherit;
  }

  &-primary {
    background-color: $color-yellow !important;
    color: $color-gray;
  }

  &-secondary {
    background-color: $color-white !important;
    color: $color-gray;
  }

  &-border {
    background-color: $color-white !important;
    border: 1px solid $color-base-color-01;
    color: $color-base-color-01;
    box-shadow: none;
  }

  &-transparent {
    background-color: transparent !important;
    border: 1px solid $color-white;
    color: $color-white;
    box-shadow: none;
  }
}
</style>
