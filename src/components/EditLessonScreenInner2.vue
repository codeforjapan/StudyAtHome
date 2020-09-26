<template>
  <div>
    <editor-textarea
      v-model="tempFormData.goal"
      :title="$t('common.lesson_data.labels.goal')"
    />
    <editor-textarea
      v-model="tempFormData.description"
      :title="$t('common.lesson_data.labels.description')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorTextarea from '@/components/EditorTextarea.vue'

export type formData = {
  goal: string
  description: string
}
@Component({
  components: {
    EditorTextarea,
  },
})
export default class EditLessonScreenInner2 extends Vue {
  tempFormData = {
    goal: this.form.goal,
    description: this.form.description,
  }

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      goal: '',
      description: '',
    }),
  })
  public value!: formData

  private get form(): formData {
    return this.value
  }

  @Watch('tempFormData', { deep: true })
  onChangeTempSecondFormData() {
    this.input(this.tempFormData)
  }

  @Watch('value', { deep: true })
  onChangeValueFormData() {
    this.tempFormData = this.value
  }

  @Emit()
  public input(value: formData) {
    return value
  }
}
</script>
