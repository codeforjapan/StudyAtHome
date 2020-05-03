<template>
  <div class="MainPage">
    <div class="Logo">
      <Logo />
    </div>
    <v-row class="DataBlock">
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="1"
          realtime="9:00 - 10:00"
          content="内容（1時間目！！！！！）"
        />
      </v-col>
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="2"
          realtime="10:00 - 11:00"
          content="内容（2時間目！！！！！）"
        />
      </v-col>
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="3"
          realtime="12:00 - 13:00"
          content="内容（3時間目！！！！！）"
        />
      </v-col>
      <v-col cols="12" md="6">
        <StudyCard
          schooltime="4"
          realtime="14:00 - 15:00"
          content="内容（4時間目！！！！！）"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StudyCard from '@/components/StudyCard'
import Logo from '@/assets/svgs/logo.svg'
export default {
  components: { StudyCard, Logo },
}
</script>

<style lang="scss" scoped>
.MainPage {
  .Logo {
    text-align: center;
  }
  .DataBlock {
    margin: 20px -12px;
    .studycard {
      margin-bottom: 20px;
    }
  }
}
</style>
