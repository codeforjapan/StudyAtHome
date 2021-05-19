<template>
  <v-bottom-sheet :value="expanded" no-click-animation persistent scrollable>
    <v-card class="EditingScreen">
      <v-card-title class="EditingScreen-CardElements">
        <v-container class="EditingScreen-Container">
          <div class="EditingScreen-Header">
            <span class="En">CREATE TIMETABLE</span>
            <h2 class="Title">
              {{ $t('components.editing_screen.title') }}
            </h2>
          </div>
        </v-container>
      </v-card-title>
      <v-card-text class="EditingScreen-CardText">
        <v-container class="EditingScreen-FormContainer">
          <span class="EditingScreen-Note">
            {{ $t('components.editing_screen.required') }}
          </span>
          <edit-lesson-screen-inner1 v-model="firstPageData" />
          <edit-lesson-screen-inner2 v-model="secondPageData" />
          <edit-lesson-screen-inner3 v-model="thirdPageData" />
          <edit-lesson-screen-inner4 v-model="fourthPageData" />
        </v-container>
      </v-card-text>
      <v-card-actions class="EditingScreen-CardElements">
        <v-container class="EditingScreen-Container">
          <div class="EditingScreen-Footer">
            <div class="EditingScreen-ActionButtons">
              <base-action-button
                class="Button"
                theme="transparent"
                :text="$t('common.general.buttons.cancel')"
                @click="$emit('collapse')"
              />
              <base-action-button
                class="Button"
                theme="primary"
                :text="$t('common.general.buttons.save')"
                :is-disabled="isDisabled"
                @click="saveLessonData"
              />
            </div>
          </div>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="error" :timeout="5000" top color="#C01B61">
      {{ $t('components.editing_screen.error.could_not_add_lesson') }}
    </v-snackbar>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { vxm } from '@/store'
import BaseActionButton from '@/components/BaseActionButton.vue'
import EditLessonScreenInner1 from '@/components/EditLessonScreenInner1.vue'
import EditLessonScreenInner2 from '@/components/EditLessonScreenInner2.vue'
import EditLessonScreenInner3 from '@/components/EditLessonScreenInner3.vue'
import EditLessonScreenInner4 from '@/components/EditLessonScreenInner4.vue'
import classData from '@/types/store/classData'

type LessonDataType = {
  lessonId: string
  isHidden: boolean
  date: string
  startTime: string
  endTime: string
  title: string
  subjectName: string
  subjectColor: string
  goal: string
  description: string
  videoUrl: string
  videoTitle: string
  videoThumbnailUrl: string
  pages: string
  materialsTitle: string
  materialsUrl: string
}

type stateType = {
  error: boolean
  lessonData: LessonDataType
}

export default Vue.extend({
  components: {
    BaseActionButton,
    EditLessonScreenInner1,
    EditLessonScreenInner2,
    EditLessonScreenInner3,
    EditLessonScreenInner4,
  },
  props: {
    expanded: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: Object as () => LessonDataType,
      required: false,
      default(): LessonDataType {
        return {
          isHidden: false,
          lessonId: '',
          date: '',
          startTime: '',
          endTime: '',
          title: '',
          subjectName: '',
          subjectColor: '#BAC8FF',
          goal: '',
          description: '',
          videoUrl: '',
          videoTitle: '',
          videoThumbnailUrl: '',
          pages: '',
          materialsTitle: '',
          materialsUrl: '',
        }
      },
    },
  },
  data(): stateType {
    return {
      error: false,
      lessonData: {
        isHidden: this.value.isHidden,
        lessonId: this.value.lessonId,
        date: this.value.date,
        startTime: this.value.startTime,
        endTime: this.value.endTime,
        title: this.value.title,
        subjectName: this.value.subjectName,
        subjectColor: this.value.subjectColor,
        goal: this.value.goal,
        description: this.value.description,
        videoUrl: this.value.videoUrl,
        videoTitle: this.value.videoTitle,
        videoThumbnailUrl: this.value.videoThumbnailUrl,
        pages: this.value.pages,
        materialsTitle: this.value.materialsTitle,
        materialsUrl: this.value.materialsUrl,
      },
    }
  },
  computed: {
    isDisabled(): boolean {
      return (
        !this.lessonData.date ||
        !this.lessonData.startTime ||
        !this.lessonData.endTime ||
        !this.lessonData.title ||
        !this.lessonData.subjectName
      )
    },
    firstPageData: {
      get(): Object {
        return {
          date: this.lessonData.date,
          startTime: this.lessonData.startTime,
          endTime: this.lessonData.endTime,
          title: this.lessonData.title,
          subjectName: this.lessonData.subjectName,
          subjectColor: this.lessonData.subjectColor,
        }
      },
      set(val: any): void {
        this.lessonData.date = val.date
        this.lessonData.startTime = val.startTime
        this.lessonData.endTime = val.endTime
        this.lessonData.title = val.title
        this.lessonData.subjectName = val.subjectName
        this.lessonData.subjectColor = val.subjectColor
      },
    },
    secondPageData: {
      get(): Object {
        return {
          goal: this.lessonData.goal,
          description: this.lessonData.description,
        }
      },
      set(val: any): void {
        this.lessonData.goal = val.goal
        this.lessonData.description = val.description
      },
    },
    thirdPageData: {
      get(): Object {
        return {
          videoUrl: this.lessonData.videoUrl,
          videoTitle: this.lessonData.videoTitle,
          videoThumbnailUrl: this.lessonData.videoThumbnailUrl,
        }
      },
      set(val: any): void {
        this.lessonData.videoUrl = val.videoUrl
        this.lessonData.videoTitle = val.videoTitle
        this.lessonData.videoThumbnailUrl = val.videoThumbnailUrl
      },
    },
    fourthPageData: {
      get(): Object {
        return {
          pages: this.lessonData.pages,
          materialsTitle: this.lessonData.materialsTitle,
          materialsUrl: this.lessonData.materialsUrl,
        }
      },
      set(val: any): void {
        this.lessonData.pages = val.pages
        this.lessonData.materialsTitle = val.materialsTitle
        this.lessonData.materialsUrl = val.materialsUrl
      },
    },
  },
  watch: {
    value(value) {
      this.lessonData = value
    },
  },
  methods: {
    saveLessonData() {
      if (this.lessonData.lessonId === '') {
        this.registerLesson()
      } else {
        this.changeLesson()
      }
    },
    async changeLesson() {
      try {
        const lessonData: classData.Lesson = await this.buildLessonData()
        await vxm.classData.changeLesson({
          editData: lessonData,
          id: this.lessonData.lessonId,
        })
        await this.$emit('collapse')
      } catch {
        this.error = true
      }
    },
    async registerLesson() {
      try {
        const lessonData: classData.Lesson = await this.buildLessonData()
        await vxm.classData.registerLesson(lessonData)
        await this.$emit('collapse')
      } catch {
        this.error = true
      }
    },
    buildLessonData(): classData.Lesson {
      const startTimeStr: string =
        this.lessonData.date + ' ' + this.lessonData.startTime
      const startTimeDate: Date = dayjs(startTimeStr).toDate()
      const endTimeStr: string =
        this.lessonData.date + ' ' + this.lessonData.endTime
      const endTimeDate: Date = dayjs(endTimeStr).toDate()
      const videoData = []
      if (this.lessonData.videoUrl)
        videoData.push({
          url: this.lessonData.videoUrl,
          title: this.lessonData.videoTitle,
          thumbnailUrl: this.lessonData.videoThumbnailUrl,
        })
      const materialData = []
      if (this.lessonData.materialsUrl)
        materialData.push({
          title:
            this.lessonData.materialsTitle !== ''
              ? this.lessonData.materialsTitle
              : this.lessonData.materialsUrl,
          url: this.lessonData.materialsUrl,
        })
      return {
        startTime: startTimeDate,
        endTime: endTimeDate,
        title: this.lessonData.title,
        subject: {
          name: this.lessonData.subjectName,
          color: this.lessonData.subjectColor,
        },
        goal: this.lessonData.goal,
        description: this.lessonData.description,
        videos: videoData,
        pages: this.lessonData.pages,
        materials: materialData,
        isHidden: this.lessonData.isHidden,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.EditingScreen {
  background-color: $color-base-color-07;
  border-radius: 24px 24px 0 0 !important;
  padding: 16px;
  margin-top: -40px;
}
.EditingScreen-Note {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: $color-white;
  margin-bottom: 4px;
}
.EditingScreen-CardElements {
  padding: 0 !important;
}
.EditingScreen-CardText {
  padding: 16px 8px 0 0 !important;
}
.EditingScreen-FormContainer {
  padding: 0 !important;
}
.EditingScreen-Container {
  padding: 0;
}
.EditingScreen-Header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $color-white;
  border-bottom: 1px solid $color-base-color-01;
  padding: 0 0 4px !important;

  .En {
    font-size: 12px;
    font-weight: bold;
  }

  .Title {
    font-size: 20px;
  }
}
.EditingScreen-Paging {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;

  .PagingNumber {
    font-size: 18px;
    color: $color-white;
  }
}
.EditingScreen-Form {
  padding: 16px 16px 0 0 !important;
}
.EditingScreen-Footer {
  border-top: 1px solid $color-base-color-01;
}
.EditingScreen-ActionButtons {
  display: flex;
  justify-content: space-between;

  .Button {
    flex: 0 1 48%;
  }
}
</style>
