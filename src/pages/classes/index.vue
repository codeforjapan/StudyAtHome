<template>
  <div class="MainPage">
    <div v-if="classData.lessonsOnCurrentDate.length">
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

type Computed = {
  today: boolean
  dateTitle: string
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: { PeriodCard },
  layout: 'classes',
  data() {
    return {
      classData: vxm.classData
    }
  },
  computed: {
    today() {
      return isToday(vxm.app.currentDate)
    },
    dateTitle() {
      return dayjs(vxm.app.currentDate).format('M/D')
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
