<template>
  <div class="MainPage">
    <v-row v-if="lessons[displayDate]" class="DataBlock">
      <v-col
        v-for="(item, i) in lessons[displayDate]"
        :key="i"
        cols="12"
        md="6"
      >
        <StudyCard
          :schooltime="i + 1"
          :realtime="item.startTime"
          :content="item.content"
          :subject="item.subject"
        />
      </v-col>
    </v-row>

    <v-row
      v-else-if="displayDate === this.$dayjs().format('YYYY-MM-DD')"
      class="DataBlock"
    >
      <h1 style="color: white; width: 100vw; text-align: center;">
        今日の時間割はまだ届いていないみたいです
      </h1>
    </v-row>
    <v-row v-else class="DataBlock">
      <h1 style="color: white; width: 100vw; text-align: center;">
        {{ this.$dayjs(displayDate).format('M/D') }}
        の時間割はまだ届いていないみたいです
      </h1>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import { Lesson } from '@/store/modules/class'
import StudyCard from '@/components/StudyCard.vue'
export default Vue.extend({
  components: { StudyCard },
  layout: 'classes',
  computed: {
    lessons(): {
      [key: string]: Lesson
    } {
      return vxm.class.classData.lessons
    },
    displayDate(): string {
      return vxm.class.displayDate
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
