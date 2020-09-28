<template>
  <div class="MainPage">
    <div v-if="Object.keys(classData.lessonsGroupByPeriod).length">
      <period-section
        v-for="(lessons, time, index) in classData.lessonsGroupByPeriod"
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

type Data = {
  classData: typeof vxm.classData
}

type Computed = {
  today: boolean
  dateTitle: string
}

export default Vue.extend({
  components: { PeriodSection },
  layout: 'classes',
  data() {
    return {
      classData: vxm.classData,
    }
  },
  computed: {
    currentDate() {
      return vxm.app.currentDate
    },
    today() {
      return isToday(vxm.app.currentDate)
    },
    dateTitle() {
      return dayjs(vxm.app.currentDate).format('M/D')
    },
  },
  watch: {
    async currentDate() {
      await this.classData.getLessonsByCurrentDate()
    },
  },
  async mounted() {
    await this.classData.getLessonsByCurrentDate()
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
