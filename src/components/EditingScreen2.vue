<template>
  <div>
    <editor-textarea v-model="tempFormData.objectives" title="学習の目的" />
    <editor-textarea v-model="tempFormData.description" title="詳細説明" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorTextarea from '@/components/EditorTextarea.vue'

export type formData = {
  objectives: string
  description: string
}
@Component({
  components: {
    EditorTextarea
  }
})
export default class EditingScreen2 extends Vue {
  tempFormData = {
    objectives: this.form.objectives,
    description: this.form.description
  }

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      objectives: '',
      description: ''
    })
  })
  public value!: formData

  private get form(): formData {
    return this.value
  }

  @Watch('tempFormData', { deep: true })
  onChangeTempSecondFormData() {
    this.input(this.tempFormData)
  }

  @Emit()
  public input(value: formData) {
    return value
  }
}
</script>
