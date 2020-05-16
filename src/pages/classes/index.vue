<template>
  <div class="MainPage">
    <v-row v-if="Lessons[ViewDate]" class="DataBlock">
      <v-col v-for="(item, i) in Lessons[ViewDate]" :key="i" cols="12" md="6">
        <StudyCard
          :schooltime="i + 1"
          :realtime="item.realTime"
          :content="item.Content"
          :subject="item.Subject"
        />
      </v-col>
    </v-row>

    <v-row
      v-else-if="ViewDate === this.$dayjs().format('YYYY-MM-DD')"
      class="DataBlock"
    >
      <h1 style="color: white; width: 100vw; text-align: center;">
        今日の時間割はまだ届いていないみたいです
      </h1>
    </v-row>
    <v-row v-else class="DataBlock">
      <h1 style="color: white; width: 100vw; text-align: center;">
        {{ this.$dayjs(ViewDate).format('M/D') }}
        の時間割はまだ届いていないみたいです
      </h1>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import StudyCard from '@/components/StudyCard.vue'
export default Vue.extend({
  components: { StudyCard },
  layout: 'classes',
  computed: {
    ...mapGetters('modules/class', ['Lessons', 'ViewDate'])
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
