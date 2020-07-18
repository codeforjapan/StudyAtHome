<template>
  <div>
    <base-dialog
      v-model="openEditingVisibilityDialog"
      :icon-name="value.isHidden ? 'mdi-eye' : 'mdi-eye-off'"
      hide-default-cancel-button
      :actions="[
        {
          buttonLabel: actionButtonLabel,
          iconName: '',
          theme: 'primary',
          action: () => {
            toggleIsHidden()
            return false
          }
        },
        {
          buttonLabel: 'キャンセル',
          iconName: '',
          theme: 'border',
          action: () => {
            closeModal()
            return false
          }
        }
      ]"
      @click-outside="closeModal"
    >
      <template v-slot:title>
        {{ modalTitle }}
      </template>
      <template v-slot:default>
        <div class="EditingVisibilityModal-Contents">
          <p class="EditingVisibilityModal-Text">
            {{ date }} <br />
            {{ time }} <br />
            {{ subjectName }} <br />
            {{ value.title }}
          </p>
        </div>
      </template>
    </base-dialog>
    <v-snackbar v-model="error" :timeout="5000" absolute top color="#C01B61">
      エラーにより公開ステータスの変更に失敗しました。時間をおいて再度お試しください。
    </v-snackbar>
    <v-snackbar v-model="success" :timeout="5000" absolute top color="success">
      授業の公開ステータスを変更しました。
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import BaseDialog from '@/components/BaseDialog.vue'
import { vxm } from '@/store'
import { classData } from '@/types/store/classData'

type LocalData = {
  openEditingVisibilityDialog: boolean
  error: boolean
  success: boolean
}

export default Vue.extend({
  components: {
    BaseDialog
  },
  props: {
    editingVisibilityMode: {
      type: Boolean,
      required: true,
      default: false
    },
    value: {
      type: Object as () => classData.LessonWithId,
      required: true,
      default: {
        docId: ''
      }
    }
  },
  data(): LocalData {
    return {
      openEditingVisibilityDialog: false,
      error: false,
      success: false
    }
  },
  computed: {
    modalTitle(): string {
      return this.value.isHidden
        ? '時間割を公開にします'
        : '時間割を非公開にします'
    },
    date(): string {
      return this.value.startTime
        ? dayjs(this.value.startTime).format('MM月DD日(ddd)')
        : ''
    },
    time(): string {
      return (
        (this.value.startTime
          ? dayjs(this.value.startTime).format('HH:mm')
          : '') +
        ' - ' +
        (this.value.endTime ? dayjs(this.value.endTime).format('HH:mm') : '')
      )
    },
    subjectName(): string {
      return this.value.subject ? this.value.subject.name : ''
    },
    actionButtonLabel(): string {
      return this.value.isHidden ? '公開する' : '非公開にする'
    }
  },
  watch: {
    editingVisibilityMode(value) {
      this.openEditingVisibilityDialog = value
    }
  },
  methods: {
    toggleIsHidden() {
      const lesson = Object.assign({}, this.value, {
        isHidden: !this.value.isHidden
      }) as classData.Lesson
      vxm.classData
        .changeLesson({
          editData: lesson,
          id: this.value.docId
        })
        .then(() => {
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 5000)
          this.$emit('close')
        })
        .catch(() => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 5000)
        })
    },
    closeModal() {
      this.$emit('close')
    }
  }
})
</script>

<style scoped lang="scss">
.EditingVisibilityModal-Text {
  font-size: 16px;
  font-weight: bold;
  color: $color-gray;
  margin: 6px 0 12px;
  text-align: center;
}
</style>
