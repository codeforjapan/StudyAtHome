<template>
  <div>
    <p v-if="openEditingVisibilityDialog">Good!</p>
    <base-dialog
      v-model="openEditingVisibilityDialog"
      icon-name="mdi-eye-off"
      hide-default-cancel-button
      :actions="[
        {
          buttonLabel: '非公開にする',
          iconName: '',
          theme: 'primary',
          action: () => {
            return false
          }
        },
        {
          buttonLabel: 'キャンセル',
          iconName: '',
          theme: 'border',
          action: () => {
            return false
          }
        }
      ]"
    >
      <template v-slot:title>
        {{ title }}
      </template>
      <template v-slot:default>
        <div class="EditingVisibilityModal-Contents">
          <p class="EditingVisibilityModal-Text">
            {{ date }} <br />
            {{ time }} <br />
            {{ value.firstPageData.subjectName }}
          </p>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import BaseDialog from '@/components/BaseDialog.vue'
import { vxm } from '@/store'

type LocalData = {
  app: typeof vxm.app
}

export default Vue.extend({
  middleware: 'checkClassData',
  components: {
    BaseDialog
  },
  props: {
    openEditingVisibilityDialog: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      required: false,
      default: () => ({
        isHidden: false,
        lessonId: '',
        firstPageData: {
          date: '',
          startTime: '',
          endTime: '',
          title: '',
          subjectName: '',
          subjectColor: '#BAC8FF'
        }
      })
    }
  },
  data(): LocalData {
    return {
      app: vxm.app
    }
  },
  computed: {
    title() {
      return this.value.isHidden
        ? '時間割を公開にします'
        : '時間割を非公開にします'
    },
    date() {
      return this.value.firstPageData && this.value.firstPageData.date
        ? dayjs(this.value.firstPageData.date).format('MM月DD日(ddd)')
        : null
    },
    time() {
      return (
        (this.value.firstPageData && this.value.firstPageData.startTime
          ? this.value.firstPageData.startTime
          : null) +
        ' - ' +
        (this.value.firstPageData && this.value.firstPageData.endTime
          ? this.value.firstPageData.endTime
          : null)
      )
    }
  }
})
</script>

<style scoped lang="scss">
.v-btn {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  background-color: $color-white;
}
.bar {
  background-color: $color-back-gray;
  text-align: center;
}
.content {
  background-color: $color-base-color-01;
}
.EditingVisibilityModal-Text {
  font-size: 16px;
  font-weight: bold;
  color: $color-gray;
  margin: 6px 0 12px;
  text-align: center;
}
</style>
