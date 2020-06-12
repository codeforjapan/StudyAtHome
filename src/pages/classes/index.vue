<template>
  <div class="MainPage">
    <div v-if="classData.getLessonsByDisplayDate.length">
      <period-card :class-data="classData" />
    </div>
    <div v-else-if="today" class="Classes-Outer">
      <h1 class="Classes-Title">
        今日の時間割はまだ届いていないみたいです
      </h1>
    </div>
    <div v-else class="Classes-Outer">
      <h1 class="Classes-Title">
        {{ dateTitle }} の時間割はまだ届いていないみたいです
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import isToday from 'date-fns/isToday'
import { vxm } from '@/store'
import PeriodCard from '@/components/PeriodCard.vue'

type Data = {
  classData: typeof vxm.classData
}

type Methods = {
  formatDate(date: Date): string
}

type Computed = {
  today: boolean
  dateTitle: string
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: { PeriodCard },
  layout: 'classes',
  data() {
    return {
      classData: vxm.classData
    }
  },
  computed: {
    today() {
      return isToday(vxm.app.displayDate)
    },
    dateTitle() {
      return dayjs(vxm.app.displayDate).format('M/D')
    }
  },
  methods: {
    formatDate(date: Date) {
      return dayjs(date).format('HH:MM')
    }
  }
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
