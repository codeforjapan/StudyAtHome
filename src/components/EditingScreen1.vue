<template>
  <div>
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
    <v-dialog
      ref="startTimeDialog"
      v-model="startTimePickerOpen"
      :return-value.sync="tempFormData.startTime"
      persistent
      width="290px"
    >
      <v-time-picker
        v-if="startTimePickerOpen"
        v-model="tempFormData.startTime"
        format="24hr"
        :max="tempFormData.endTime"
        full-width
      >
        <v-spacer />
        <v-btn text color="primary" @click="startTimePickerOpen = false">
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.startTimeDialog.save(tempFormData.startTime)"
        >
          OK
        </v-btn>
      </v-time-picker>
    </v-dialog>
    <v-dialog
      ref="endTimeDialog"
      v-model="endTimePickerOpen"
      :return-value.sync="tempFormData.endTime"
      persistent
      width="290px"
    >
      <v-time-picker
        v-if="endTimePickerOpen"
        v-model="tempFormData.endTime"
        :min="tempFormData.startTime"
        format="24hr"
        full-width
      >
        <v-spacer />
        <v-btn text color="primary" @click="endTimePickerOpen = false">
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.endTimeDialog.save(tempFormData.endTime)"
        >
          OK
        </v-btn>
      </v-time-picker>
    </v-dialog>
    <v-dialog
      ref="colorDialog"
      v-model="colorPickerOpen"
      :return-value.sync="tempFormData.subjectColor"
      persistent
      width="290px"
    >
      <v-card>
        <v-color-picker
          v-if="colorPickerOpen"
          v-model="tempFormData.subjectColor"
          disabled
          hide-canvas
          hide-inputs
          hide-mode-switch
          show-swatches
          :swatches="colorArray"
          full-width
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="colorPickerOpen = false">
            Cancel
          </v-btn>
          <v-btn
            text
            @click="$refs.colorDialog.save(tempFormData.subjectColor)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <editor-field
      v-model="tempFormData.date"
      title="日付設定 *"
      label="date"
      placeholder="2020/05/30"
      :transparent="true"
      icon-name="mdi-calendar"
      :readonly="true"
      @clickButton="datePickerOpen = true"
    />
    <div class="EditingScreen-Flex EditingScreen-Time">
      <editor-field
        v-model="tempFormData.startTime"
        title="時間設定 *"
        label="start_time"
        placeholder="00:00"
        :transparent="true"
        icon-name="mdi-clock-outline"
        class="TimeField"
        :readonly="true"
        @clickButton="startTimePickerOpen = true"
      />
      <span class="Hyphen">-</span>
      <editor-field
        v-model="tempFormData.endTime"
        label="end_time"
        placeholder="00:00"
        :transparent="true"
        icon-name="mdi-clock-outline"
        class="TimeField"
        :readonly="true"
        @clickButton="endTimePickerOpen = true"
      />
    </div>
    <editor-field
      v-model="tempFormData.title"
      title="タイトル *"
      label="タイトル"
      placeholder="例）理科"
    />
    <div class="EditingScreen-Flex">
      <editor-field
        v-model="tempFormData.subjectName"
        title="教科名 *"
        label="lesson"
        placeholder="例）理科"
        class="LessonField"
      />
      <editor-color-picker-field
        title="ラベル色"
        icon-name="mdi-palette"
        :subject-color="tempFormData.subjectColor"
        :subject-name="tempFormData.subjectName"
        class="LabelField"
        @clickPickerButton="colorPickerOpen = true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import EditorField from '@/components/EditorField.vue'
import SubjectTag from '@/components/SubjectTag.vue'
import EditorColorPickerField from '@/components/EditorColorPickerField.vue'

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
    EditorField,
    SubjectTag,
    EditorColorPickerField
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
  startTimePickerOpen = false
  endTimePickerOpen = false
  colorPickerOpen = false
  colorArray = [
    ['#BAC8FF', '#748FFC'],
    ['#D0BFFF', '#9775FA'],
    ['#FCC2D7', '#F783AC'],
    ['#FFD8A8', '#FFA94D'],
    ['#D8F5A2', '#A9E34B']
  ]

  @Prop({
    type: Object as () => formData,
    required: true,
    default: () => ({
      date: '',
      startTime: '',
      endTime: '',
      title: '',
      subjectName: '',
      subjectColor: '#BAC8FF'
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
  flex: 1 0 auto;
}
.LabelField {
  margin-left: 3%;
  flex: 0 1 auto;
}
</style>
