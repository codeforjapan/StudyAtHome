<template>
  <div class="MainPage">
    <v-row v-if="classData.getLessonsByDisplayDate.length" class="DataBlock">
      <v-col
        v-for="(item, i) in classData.getLessonsByDisplayDate"
        :key="i"
        cols="12"
        md="6"
      >
        <ContentCard
          :description="formatDate(item.startTime)"
          :title="item.content"
          :subjects="[{ name: item.subject }]"
        />
      </v-col>
    </v-row>

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
import ContentCard from '@/components/ContentCard.vue'

type Data = {
  classData: typeof vxm.classData
  today: boolean
  dateTitle: string
}

export default Vue.extend({
  components: { ContentCard },
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
