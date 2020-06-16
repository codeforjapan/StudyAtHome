<template>
  <div>
    <editor-input-field-pickable
      v-model="tempFormData.pages"
      title="教科書ページ"
      label="textbook_page"
      placeholder="例）10〜14ページ"
    />
    <editor-input-field-pickable
      v-model="tempFormData.materialsTitle"
      title="副教材タイトル"
      label="sub_text"
      placeholder="例）やさしい理科教材"
    />
    <editor-input-field-pickable
      v-model="tempFormData.materialsUrl"
      title="副教材URL"
      label="sub_text_url"
      placeholder="https://"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorInputFieldPickable from '~/components/EditorInputFieldPickable.vue'

export type formData = {
  pages: string
  materialsTitle: string
  materialsUrl: string
}
@Component({
  components: {
    EditorInputFieldPickable
  }
})
export default class EditLessonScreenInner1 extends Vue {
  tempFormData = {
    pages: this.form.pages,
    materialsTitle: this.form.materialsTitle,
    materialsUrl: this.form.materialsUrl
  }

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      pages: '',
      materialsTitle: '',
      materialsUrl: ''
    })
  })
  public value!: formData

  private get form(): formData {
    return this.value
  }

  @Watch('tempFormData', { deep: true })
  onChangeTempFormData() {
    this.input(this.tempFormData)
  }

  @Emit()
  public input(value: formData) {
    return value
  }
}
</script>
