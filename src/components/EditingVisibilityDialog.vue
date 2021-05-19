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
          },
        },
        {
          buttonLabel: $t('common.general.buttons.cancel'),
          iconName: '',
          theme: 'border',
          action: () => {
            closeModal()
            return false
          },
        },
      ]"
      @click-outside="closeModal"
    >
      <template #title>
        {{ modalTitle }}
      </template>
      <template #default>
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
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{
        $t(
          'components.editing_visibility_dialog.error.could_not_change_visibility'
        )
      }}
    </v-snackbar>
    <v-snackbar v-model="success" :timeout="5000" top color="success">
      {{ $t('components.editing_visibility_dialog.success.message') }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseDialog from '@/components/BaseDialog.vue'
import { vxm } from '@/store'
import classData from '@/types/store/classData'

type LocalData = {
  openEditingVisibilityDialog: boolean
  error: boolean
  success: boolean
}

export default Vue.extend({
  components: {
    BaseDialog,
  },
  props: {
    editingVisibilityMode: {
      type: Boolean,
      required: true,
      default: false,
    },
    value: {
      type: Object as () => classData.LessonWithId,
      required: true,
    },
  },
  data(): LocalData {
    return {
      openEditingVisibilityDialog: false,
      error: false,
      success: false,
    }
  },
  computed: {
    modalTitle(): string {
      return this.value.isHidden
        ? this.$t('components.editing_visibility_dialog.title.show').toString()
        : this.$t('components.editing_visibility_dialog.title.hide').toString()
    },
    date(): string {
      return this.value.startTime
        ? this.$dayjs(this.value.startTime).format('MM月DD日(ddd)')
        : ''
    },
    time(): string {
      return (
        (this.value.startTime
          ? this.$dayjs(this.value.startTime).format('HH:mm')
          : '') +
        ' - ' +
        (this.value.endTime
          ? this.$dayjs(this.value.endTime).format('HH:mm')
          : '')
      )
    },
    subjectName(): string {
      return this.value.subject ? this.value.subject.name : ''
    },
    actionButtonLabel(): string {
      return this.value.isHidden
        ? this.$t(
            'components.editing_visibility_dialog.buttons.show'
          ).toString()
        : this.$t(
            'components.editing_visibility_dialog.buttons.hide'
          ).toString()
    },
  },
  watch: {
    editingVisibilityMode(value) {
      this.openEditingVisibilityDialog = value
    },
  },
  methods: {
    toggleIsHidden() {
      const lesson = {
        isHidden: !this.value.isHidden,
      }
      vxm.classData
        .changeLesson({
          editData: lesson,
          id: this.value.id,
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
    },
  },
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
