<template>
  <div class="MainPage">
    <v-row v-if="classData.lessons[classData.displayDate]" class="DataBlock">
      <v-col
        v-for="(item, i) in classData.lessons[classData.displayDate]"
        :key="i"
        cols="12"
        md="6"
      >
        <!-- @todo データ構造にあわせる -->
        <StudyCard
          :schooltime="i + 1"
          :realtime="item.startTime"
          :content="item.content"
          :subject="item.subject"
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
import StudyCard from '@/components/StudyCard.vue'

type Data = {
  classData: typeof vxm.classData
}

type Computed = {
  isToday: boolean
  dateTitle: string
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: { StudyCard },
  layout: 'classes',
  data() {
    return {
      classData: vxm.classData
    }
  },
  computed: {
    isToday() {
      return this.classData.displayDate === dayjs().format('YYYY-MM-DD')
    },
    dateTitle() {
      return dayjs(this.classData.displayDate).format('M/D')
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
