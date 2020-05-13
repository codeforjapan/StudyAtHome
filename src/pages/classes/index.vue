<template>
  <div class="MainPage">
    <v-row class="DataBlock">
      <v-col v-for="(item, i) in Lessons[today]" :key="i" cols="12" md="6">
        <StudyCard
          :schooltime="i + 1"
          :realtime="item.realTime"
          :content="item.Content"
          :subject="item.Subject"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StudyCard from '@/components/StudyCard'
export default {
  components: { StudyCard },
  middleware: 'checkClassData',
  computed: {
    ...mapGetters('modules/class', ['Lessons']),
  },
  data() {
    return {
      today: this.$dayjs().format('YYYY-MM-DD'),
    }
  },
}
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
