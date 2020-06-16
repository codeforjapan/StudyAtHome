<template>
  <div class="MainPage">
    <div v-if="classData.lessonsOnCurrentDate.length">
      <period-card
        v-for="(lessons, time, index) in lessonsGroupByPeriod"
        :key="index"
        :period="index"
        :time="time"
        :class-data="lessons"
        :editable="true"
        @clickEditButton="doEdit"
      />
      <ul class="Classes-List">
        <li>おうちで時間割について</li>
        <li>お問い合わせ</li>
        <li>サイトポリシー</li>
      </ul>
    </div>
    <div v-else-if="today" class="Classes-Outer">
      <h1 class="Classes-Title">まだ今日の時間割はありません</h1>
      <ul class="Classes-List">
        <li>おうちで時間割について</li>
        <li>お問い合わせ</li>
        <li>サイトポリシー</li>
      </ul>
    </div>
    <div v-else class="Classes-Outer">
      <h1 class="Classes-Title">
        まだ{{ dateTitle }}の時間割は<br />ありません
      </h1>
      <ul class="Classes-List">
        <li>おうちで時間割について</li>
        <li>お問い合わせ</li>
        <li>サイトポリシー</li>
      </ul>
    </div>
    <simple-bottom-sheet
      message="2年B組の授業を追加・編集する"
      :expanded="!editingMode"
      @clickAddButton="toggleScreen"
    />
    <editing-screen
      :value="editPageValue"
      :expanded="editingMode"
      @collapse="onCollapseEditingScreen"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import isToday from 'date-fns/isToday'
import { vxm } from '@/store'
import PeriodCard from '@/components/PeriodCard.vue'
import SimpleBottomSheet from '@/components/SimpleBottomSheet.vue'
import EditingScreen from '@/components/EditingScreen.vue'
import { classData } from '@/types/store/classData'
import LessonWithId = classData.LessonWithId

type LessonsGroupedBy = {
  [key: string]: LessonWithId[]
}

type DataType = {
  classData: typeof vxm.classData
  editingMode: boolean
  editPageValue: object
}

type Computed = {
  today: boolean
  dateTitle: string
  lessonsGroupByPeriod: LessonsGroupedBy
}

export default Vue.extend({
  components: {
    PeriodCard,
    SimpleBottomSheet,
    EditingScreen
  },
  layout: 'protected',
  data(): DataType {
    return {
      classData: vxm.classData,
      editingMode: false,
      editPageValue: {
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
      }
    }
  },
  computed: {
    today() {
      return isToday(vxm.app.currentDate)
    },
    dateTitle() {
      return dayjs(vxm.app.currentDate).format('M/D')
    },
    lessonsGroupByPeriod() {
      const groupBy = (targets: LessonWithId[], key: keyof LessonWithId) =>
        targets.reduce((acc: LessonsGroupedBy, currentLesson: LessonWithId) => {
          const valueToGroup = currentLesson[key].toString()
          acc[valueToGroup] = acc[valueToGroup] || []
          acc[valueToGroup].push(currentLesson)
          return acc
        }, {})
      return groupBy(this.classData.lessonsOnCurrentDate, 'startTime')
    }
  },
  methods: {
    onCollapseEditingScreen(): void {
      this.toggleScreen()
      this.resetEditingScreen()
    },
    toggleScreen(): void {
      this.editingMode = !this.editingMode
    },
    resetEditingScreen(): void {
      this.editPageValue = {
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
      }
    },
    // @todo doEdit の中身を整理する
    doEdit(value: classData.LessonWithId): void {
      const videoUrl = value.videos.length === 0 ? '' : value.videos[0].url
      const videoTitle = value.videos.length === 0 ? '' : value.videos[0].title
      const videoThumbnailUrl =
        value.videos.length === 0 ? '' : value.videos[0].thumbnailUrl
      const materialTitle =
        value.materials.length === 0 ? '' : value.materials[0].title
      const materialUrl =
        value.materials.length === 0 ? '' : value.materials[0].url
      this.editPageValue = {
        isHidden: value.isHidden,
        lessonId: value.docId,
        firstPageData: {
          date:
            value.startTime.getFullYear() +
            '-' +
            (value.startTime.getMonth() + 1) +
            '-' +
            value.startTime.getDate(),
          startTime:
            value.startTime.getHours() + ':' + value.startTime.getMinutes(),
          endTime: value.endTime.getHours() + ':' + value.endTime.getMinutes(),
          title: value.title,
          subjectName: value.subject.name,
          subjectColor: value.subject.color
        },
        secondPageData: {
          goal: value.goal,
          description: value.description
        },
        thirdPageData: {
          videoUrl,
          videoTitle,
          videoThumbnailUrl
        },
        fourthPageData: {
          pages: value.pages,
          materialsTitle: materialTitle,
          materialsUrl: materialUrl
        }
      }
      this.toggleScreen()
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
}
.Classes-Outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1 0 auto;
}
.Classes-Title {
  font-size: 21px;
  font-weight: normal;
  color: $color-white;
  text-align: center;
}
.Classes-List {
  font-size: 12px;
  color: $color-white;
  text-align: center;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 12px;

    &::before {
      content: '-';
      padding-right: 8px;
    }
  }
}
</style>
