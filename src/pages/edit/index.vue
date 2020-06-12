<template>
  <div class="MainPage">
    <div v-if="classData.getLessonsByDisplayDate.length">
      <period-card-editable :class-data="classData" />
    </div>
    <div v-else class="Classes-Outer">
      <h1 class="Classes-Title">
        まだ{{ dateTitle }}の時間割は<br />ありません
      </h1>
      <ul class="Classes-List">
        <li>おうちで時間割について</li>
        <li>お問い合わせ</li>
        <li>サイトポリシー</li>
      </ul>
    </div>
    <simple-bottom-sheet
      message="2年B組の授業を追加・編集する"
      :expanded="isExpandedButton"
      @addButtonClicked="handler"
    />
    <editing-screen :expanded="!isExpandedButton" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { vxm } from '@/store'
import PeriodCardEditable from '@/components/PeriodCardEditable.vue'
import SimpleBottomSheet from '@/components/SimpleBottomSheet.vue'
import EditingScreen from '@/components/EditingScreen.vue'

type DataType = {
  classData: typeof vxm.classData
  dateTitle: string
  isExpandedButton: boolean
}

export default Vue.extend({
  components: {
    PeriodCardEditable,
    SimpleBottomSheet,
    EditingScreen
  },
  layout: 'protected',
  data(): DataType {
    return {
      classData: vxm.classData,
      dateTitle: '25日',
      isExpandedButton: true
    }
  },
  methods: {
    handler(): void {
      this.isExpandedButton = !this.isExpandedButton
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
}
.Classes-Outer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1 0 auto;
}
.Classes-Title {
  font-size: 21px;
  font-weight: normal;
  color: $color-white;
  text-align: center;
}
.Classes-List {
  font-size: 12px;
  color: $color-white;
  text-align: center;
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 12px;

    &::before {
      content: '-';
      padding-right: 8px;
    }
  }
}
</style>
