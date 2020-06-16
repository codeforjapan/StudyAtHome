<template>
  <v-bottom-sheet :value="expanded" no-click-animation persistent scrollable>
    <v-card class="EditingScreen">
      <v-card-title class="EditingScreen-CardElements">
        <v-container class="EditingScreen-Container">
          <div class="EditingScreen-Header">
            <span class="En">CREATE TIMETABLE</span>
            <h2 class="Title">時間割作成</h2>
          </div>
        </v-container>
      </v-card-title>
      <v-card-text class="EditingScreen-CardText">
        <v-container class="EditingScreen-FormContainer">
          <span class="EditingScreen-Note">
            *マークのあるものは必須項目です
          </span>
          <editing-screen1 v-show="page === 1" v-model="firstPageData" />
          <editing-screen2 v-show="page === 2" v-model="secondPageData" />
          <editing-screen3 v-show="page === 3" v-model="thirdPageData" />
          <editing-screen4 v-show="page === 4" v-model="fourthPageData" />
        </v-container>
      </v-card-text>
      <v-card-actions class="EditingScreen-CardElements">
        <v-container class="EditingScreen-Container">
          <div class="EditingScreen-Footer">
            <div class="EditingScreen-Paging">
              <v-btn color="white" fab :disabled="page === 1" @click="goBack">
                <v-icon color="#0071c2" large>mdi-chevron-left</v-icon>
              </v-btn>
              <span class="PagingNumber">{{ page }}/4</span>
              <v-btn
                color="white"
                fab
                :disabled="page === 4"
                @click="goForward"
              >
                <v-icon color="#0071c2" large>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div class="EditingScreen-ActionButtons">
              <base-action-button
                class="Button"
                theme="transparent"
                text="キャンセル"
                @click="$emit('collapse')"
              />
              <base-action-button
                class="Button"
                theme="primary"
                text="保存する"
                :is-disabled="isDisabled"
                @click="saveLessonData"
              />
            </div>
          </div>
        </v-container>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="error" :timeout="5000" absolute top color="#C01B61">
      エラーにより授業の追加に失敗しました。時間をおいて再度お試しください。
    </v-snackbar>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { vxm } from '@/store'
import BaseActionButton from '@/components/BaseActionButton.vue'
import EditingScreen1 from '@/components/EditingScreen1.vue'
import EditingScreen2 from '@/components/EditingScreen2.vue'
import EditingScreen3 from '@/components/EditingScreen3.vue'
import EditingScreen4 from '@/components/EditingScreen4.vue'
import { classData } from '@/types/store/classData'

type FirstPageDataType = {
  date: string
  startTime: string
  endTime: string
  title: string
  subjectName: string
  subjectColor: string
}

type SecondPageDataType = {
  goal: string
  description: string
}

type ThirdPageDataType = {
  videoUrl: string
  videoTitle: string
  videoThumbnailUrl: string
}

type FourthPageDataType = {
  pages: string
  materialsTitle: string
  materialsUrl: string
}

type DataType = {
  page: number
  error: boolean
  lessonId: string
  isHidden: boolean
  firstPageData: FirstPageDataType
  secondPageData: SecondPageDataType
  thirdPageData: ThirdPageDataType
  fourthPageData: FourthPageDataType
}

export default Vue.extend({
  components: {
    BaseActionButton,
    EditingScreen1,
    EditingScreen2,
    EditingScreen3,
    EditingScreen4
  },
  props: {
    expanded: {
      type: Boolean,
      required: false,
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
        },
        secondPageData: {
          goal: '',
          description: ''
        },
        thirdPageData: {
          videoUrl: '',
          videoTitle: '',
          videoThumbnailUrl: ''
        },
        fourthPageData: {
          pages: '',
          materialsTitle: '',
          materialsUrl: ''
        }
      })
    }
  },
  data(): DataType {
    return {
      page: 1,
      error: false,
      isHidden: this.value.isHidden,
      lessonId: this.value.lessonId,
      firstPageData: {
        date: this.value.firstPageData.date,
        startTime: this.value.firstPageData.startTime,
        endTime: this.value.firstPageData.endTime,
        title: this.value.firstPageData.title,
        subjectName: this.value.firstPageData.subjectName,
        subjectColor: this.value.firstPageData.subjectColor
      },
      secondPageData: {
        goal: this.value.secondPageData.goal,
        description: this.value.secondPageData.description
      },
      thirdPageData: {
        videoUrl: this.value.thirdPageData.videoUrl,
        videoTitle: this.value.thirdPageData.videoTitle,
        videoThumbnailUrl: this.value.thirdPageData.videoThumbnailUrl
      },
      fourthPageData: {
        pages: this.value.fourthPageData.pages,
        materialsTitle: this.value.fourthPageData.materialsTitle,
        materialsUrl: this.value.fourthPageData.materialsUrl
      }
    }
  },
  computed: {
    isDisabled(): boolean {
      return (
        !this.firstPageData.date ||
        !this.firstPageData.startTime ||
        !this.firstPageData.endTime ||
        !this.firstPageData.title ||
        !this.firstPageData.subjectName
      )
    }
  },
  watch: {
    value(value) {
      this.isHidden = value.isHidden
      this.lessonId = value.lessonId
      this.firstPageData = value.firstPageData
      this.secondPageData = value.secondPageData
      this.thirdPageData = value.thirdPageData
      this.fourthPageData = value.fourthPageData
    }
  },
  methods: {
    goForward(): Number {
      return this.page < 4 ? (this.page += 1) : 4
    },
    goBack(): Number {
      return this.page > 1 ? (this.page -= 1) : 1
    },
    saveLessonData() {
      if (this.lessonId === '') {
        this.registerLesson()
      } else {
        this.changeLesson()
      }
    },
    changeLesson() {
      const lessonData: classData.Lesson = this.buildLessonData()
      vxm.classData
        .changeLesson({ editData: lessonData, id: this.lessonId })
        .then(() => {
          this.$emit('collapse')
        })
        .catch(() => {
          this.error = true
        })
    },
    registerLesson() {
      const lessonData: classData.Lesson = this.buildLessonData()
      vxm.classData
        .registerLesson(lessonData)
        .then(() => {
          this.$emit('collapse')
        })
        .catch(() => {
          this.error = true
        })
    },
    buildLessonData(): classData.Lesson {
      const startTimeStr: string =
        this.firstPageData.date + ' ' + this.firstPageData.startTime
      const startTimeDate: Date = dayjs(startTimeStr).toDate()
      const endTimeStr: string =
        this.firstPageData.date + ' ' + this.firstPageData.endTime
      const endTimeDate: Date = dayjs(endTimeStr).toDate()
      const videoData = []
      if (this.thirdPageData.videoUrl)
        videoData.push({
          url: this.thirdPageData.videoUrl,
          title: this.thirdPageData.videoTitle,
          thumbnailUrl: this.thirdPageData.videoThumbnailUrl
        })
      const materialData = []
      if (
        this.fourthPageData.materialsTitle &&
        this.fourthPageData.materialsUrl
      )
        materialData.push({
          title: this.fourthPageData.materialsTitle,
          url: this.fourthPageData.materialsUrl
        })
      return {
        startTime: startTimeDate,
        endTime: endTimeDate,
        title: this.firstPageData.title,
        subject: {
          name: this.firstPageData.subjectName,
          color: this.firstPageData.subjectColor
        },
        goal: this.secondPageData.goal,
        description: this.secondPageData.description,
        videos: videoData,
        pages: this.fourthPageData.pages,
        materials: materialData,
        isHidden: this.isHidden
      }
    }
  }
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
