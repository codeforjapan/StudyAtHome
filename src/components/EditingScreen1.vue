<template>
  <div>
    {{ tempFormData }}
    <v-dialog
      ref="dialog"
      v-model="datePickerOpen"
      :return-value.sync="tempFormData.date"
      width="290px"
    >
      <v-date-picker v-model="tempFormData.date">
        <v-spacer />
        <v-btn text color="primary" @click="datePickerOpen = false"
          >Cancel</v-btn
        >
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(tempFormData.date)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <editor-field
      v-model="tempFormData.date"
      title="日付設定 *"
      label="date"
      placeholder="2020/05/30"
      :transparent="true"
      icon-name="mdi-calendar"
      @buttonClick="datePickerOpen = true"
    />
    <div class="EditingScreen-Flex EditingScreen-Time">
      <editor-field
        v-model="form.startTime"
        title="時間設定 *"
        label="start_time"
        placeholder="00:00"
        :transparent="true"
        icon-name="mdi-clock-outline"
        class="TimeField"
      />
      <span class="Hyphen">-</span>
      <editor-field
        v-model="form.endTime"
        label="end_time"
        placeholder="00:00"
        :transparent="true"
        icon-name="mdi-clock-outline"
        class="TimeField"
      />
    </div>
    <editor-field
      v-model="form.title"
      title="タイトル *"
      label="title"
      placeholder="例）理科"
    />
    <div class="EditingScreen-Flex">
      <editor-field
        v-model="form.subjectName"
        title="教科名 *"
        label="lesson"
        placeholder="例）理科"
        class="LessonField"
      />
      <editor-field
        v-model="form.subjectColor"
        title="ラベル色"
        icon-name="mdi-palette"
        class="LabelField"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorField from '~/components/EditorField.vue'

export type formData = {
  date: string
  startTime: string
  endTime: string
  title: string
  subjectName: string
  subjectColor: string
}
@Component({
  components: {
    EditorField
  }
})
export default class EditingScreen1 extends Vue {
  tempFormData = {
    date: this.form.date,
    startTime: this.form.startTime,
    endTime: this.form.endTime,
    title: this.form.title,
    subjectName: this.form.subjectName,
    subjectColor: this.form.subjectColor
  }

  datePickerOpen = false

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      date: '',
      startTime: '',
      endTime: '',
      title: '',
      subjectName: '',
      subjectColor: ''
    })
  })
  public value!: formData

  private get form(): formData {
    return this.value
  }

  @Watch('tempFormData')
  onChangeTempFormData() {
    this.input(this.tempFormData)
  }

  @Emit()
  public input(value: formData) {
    return value
  }
}
</script>

<style lang="scss" scoped>
.EditingScreen-Flex {
  display: flex;
  justify-content: space-between;
}
.EditingScreen-Time {
  align-items: flex-end;

  .TimeField {
    flex: 0 1 48%;
  }

  .Hyphen {
    flex: 0 1 auto;
    align-self: center;
    color: $color-white;
    font-size: 40px;
    padding: 0 8px;
  }
}
.LessonField {
  flex: 0 1 52%;
}
.LabelField {
  flex: 0 1 45%;
}
</style>
