<template>
  <div class="MainPage">
    <v-row class="DataBlock">
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="1"
          realtime="9:00 - 10:00"
          :content="users[0]"
          subject="国語"
        />
      </v-col>
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="2"
          realtime="10:00 - 11:00"
          :content="users[1]"
          subject="算数"
        />
      </v-col>
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="3"
          realtime="12:00 - 13:00"
          :content="users[2]"
          subject="理科"
        />
      </v-col>
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="4"
          realtime="14:00 - 15:00"
          content="内容（4時間目！！！！！）"
          subject="社会"
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
  computed: {
    ...mapGetters(['users']),
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
