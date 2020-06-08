<template>
  <div class="MainPage">
    <period-card
      v-if="classData.getLessonsByDisplayDate.length"
      :class-data="classData"
    />
    <v-row v-else-if="today" class="DataBlock">
      <h1 style="color: white; width: 100vw; text-align: center;">
        今日の時間割はまだ届いていないみたいです
      </h1>
    </v-row>
    <v-row v-else class="DataBlock">
      <h1 style="color: white; width: 100vw; text-align: center;">
        {{ dateTitle }} の時間割はまだ届いていないみたいです
      </h1>
    </v-row>
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
  today: boolean
  dateTitle: string
}

export default Vue.extend({
  components: { PeriodCard },
  layout: 'classes',
  data(): Data {
    return {
      classData: vxm.classData,
      today: true,
      dateTitle: '1/1'
    }
  },
  mounted() {
    vxm.classData.$subscribe('setDate', () => {
      this.today = isToday(this.classData.displayDate)
      this.dateTitle = dayjs(this.classData.displayDate).format('M/D')
    })
  },
  methods: {
    formatDate(date: Date): string {
      return dayjs(date).format('HH:MM')
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  .Logo {
    text-align: center;
  }
  .DataBlock {
    margin: 0 -12px;
    .studycard {
      margin-bottom: 20px;
    }
  }
}
</style>
