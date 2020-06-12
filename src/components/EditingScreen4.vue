<template>
  <div>
    <editor-field
      v-model="tempFormData.textBookPage"
      title="教科書ページ"
      label="textbook_page"
      placeholder="例）10〜14ページ"
    />
    <editor-field
      v-model="tempFormData.subTextTitle"
      title="副教材タイトル"
      label="sub_text"
      placeholder="例）やさしい理科教材"
    />
    <editor-field
      v-model="tempFormData.subTextUrl"
      title="副教材URL"
      label="sub_text_url"
      placeholder="https://"
      icon-name="mdi-link"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorField from '~/components/EditorField.vue'

export type formData = {
  textBookPage: string
  subTextTitle: string
  subTextUrl: string
}
@Component({
  components: {
    EditorField
  }
})
export default class EditingScreen1 extends Vue {
  tempFormData = {
    textBookPage: this.form.textBookPage,
    subTextTitle: this.form.subTextTitle,
    subTextUrl: this.form.subTextUrl
  }

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      textBookPage: '',
      subTextTitle: '',
      subTextUrl: ''
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
