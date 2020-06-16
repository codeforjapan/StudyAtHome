<template>
  <v-dialog
    max-width="320px"
    :value="value"
    :persistent="modal"
    @input="$emit('input', $event)"
  >
    <v-card class="DialogCard">
      <v-card-title class="DialogCardTitle">
        <v-icon class="DialogCardTitleIcon" size="48">{{ iconName }}</v-icon>
        <slot class="DialogCardTitleText" name="title" />
      </v-card-title>
      <v-container class="DialogCardContentContainer">
        <slot />
      </v-container>
      <v-card-actions class="DialogCardButtons px-4">
        <base-action-button
          v-for="(action, i) in actions"
          :key="i"
          class="my-3"
          :theme="action.theme"
          :icon="action.iconName"
          :text="action.buttonLabel"
          @click="doDialogAction(i)"
        />
        <base-action-button
          v-if="!hideDefaultCancelButton"
          :text="defaultCancelButtonLabel"
          theme="border"
          class="my-3"
          @click="$emit('input', false)"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseActionButton from '@/components/BaseActionButton.vue'

export type DialogAction = {
  buttonLabel: string
  iconName: string
  theme: string
  /**
   * ボタン押下時に実行する処理。実行後に BaseModalDialog を閉じないようにするには true を返す。
   */
  action: () => boolean | void
}

type Props = {
  iconName: string
  hideDefaultCancelButton: boolean
  defaultCancelButtonLabel: string
  actions: DialogAction[]
  modal: boolean
  value: boolean
}

type Methods = {
  doDialogAction(buttonIndex: number): void
}

export default Vue.extend<unknown, Methods, unknown, Props>({
  name: 'BaseDialog',
  components: { BaseActionButton },
  props: {
    iconName: {
      type: String,
      required: true
    },
    hideDefaultCancelButton: {
      type: Boolean,
      required: false,
      default: false
    },
    defaultCancelButtonLabel: {
      type: String,
      required: false,
      default: 'キャンセル'
    },
    actions: {
      type: Array as () => DialogAction[],
      required: true
    },
    modal: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doDialogAction(index) {
      if (!this.actions[index].action()) {
        this.$emit('input', false)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.v-dialog {
  .DialogCard {
    border-radius: 14px;

    &Title,
    &Buttons {
      flex-direction: column;
    }

    &Title,
    &TitleIcon {
      color: $color-base-color-01;
      font-size: 16px;
    }
  }
}
</style>
