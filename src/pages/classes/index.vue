<template>
  <div class="MainPage">
    <v-row v-if="classData.getLessonsByDisplayDate" class="DataBlock">
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

    <v-row v-else-if="isToday" class="DataBlock">
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
import { vxm } from '@/store'
import ContentCard from '@/components/ContentCard.vue'

type Data = {
  classData: typeof vxm.classData
}

type Computed = {
  isToday: boolean
  dateTitle: string
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: { ContentCard },
  layout: 'classes',
  data() {
    return {
      classData: vxm.classData
    }
  },
  computed: {
    isToday() {
      return (
        dayjs(this.classData.displayDate).format('YYYY-MM-DD') ===
        dayjs().format('YYYY-MM-DD')
      )
    },
    dateTitle() {
      return dayjs(this.classData.displayDate).format('M/D')
    }
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
