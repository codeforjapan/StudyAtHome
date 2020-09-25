<template>
  <div class="MainPage">
    <div v-if="classData.lessonsOnCurrentDate.length">
      <period-section
        v-for="(lessons, time, index) in lessonsGroupByPeriod"
        :key="index"
        :period="index"
        :time="time"
        :class-data="lessons"
      />
    </div>
    <div v-else-if="today" class="Classes-Outer">
      <h1 class="Classes-Title">
        {{ $t('pages.classes_index.no_lessons_today') }}
      </h1>
    </div>
    <div v-else class="Classes-Outer">
      <h1 class="Classes-Title">
        {{ $t('pages.classes_index.no_lessons', { date: dateTitle }) }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import isToday from 'date-fns/isToday'
import { vxm } from '@/store'
import PeriodSection from '@/components/PeriodSection.vue'
import { classData } from '@/types/store/classData'
import LessonWithId = classData.LessonWithId

type LessonsGroupedBy = {
  [key: string]: LessonWithId[]
}
type Data = {
  classData: typeof vxm.classData
}

type Computed = {
  today: boolean
  dateTitle: string
  lessonsGroupByPeriod: LessonsGroupedBy
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: { PeriodSection },
  layout: 'classes',
  data() {
    return {
      classData: vxm.classData,
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
    },
  },
})
</script>

<style lang="scss" scoped>
.MainPage {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.Classes-Outer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;
}
.Classes-Title {
  font-size: 21px;
  font-weight: normal;
  color: $color-white;
}
</style>
