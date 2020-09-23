<template>
  <div class="PeriodCard">
    <div class="PeriodCard-NumberBlock">
      <div class="PeriodCard-Number">
        <span class="PeriodCard-Number-Num">{{ period + 1 }}</span>
        <span class="PeriodCard-Number-Text">時間目</span>
      </div>
      <div class="PeriodCard-Time">
        <span>{{ formatDate(time) }}</span>
        <span>|</span>
        <span>{{ formatDate(maxEndTime) }}</span>
      </div>
    </div>
    <v-row>
      <v-col v-for="(item, i) in classData" :key="i" cols="12" md="6">
        <lesson-summary-card
          :lesson="item"
          :editable="editable"
          @toggleHidden="$emit('toggleHidden', item)"
          @clickEditButton="$emit('clickEditButton', item)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import minMax from 'dayjs/plugin/minMax'
import LessonSummaryCard from '@/components/LessonSummaryCard.vue'
import classData from '@/types/store/classData'
dayjs.extend(minMax)

export default Vue.extend({
  components: { LessonSummaryCard },
  props: {
    period: {
      type: Number,
      default: 0,
    },
    time: {
      type: String,
      default: '',
    },
    classData: {
      type: Array as () => classData.LessonWithId[],
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    maxEndTime() {
      const endTimeArray = this.classData.map((value) => dayjs(value.endTime))
      return dayjs.max(...endTimeArray)
    },
  },
  methods: {
    formatDate(date: Date): string {
      return dayjs(date).format('HH:mm')
    },
  },
})
</script>

<style scoped lang="scss">
.PeriodCard {
  display: flex;
  border-bottom: 1px solid $color-base-color-02;
  padding-bottom: 12px;
  margin-bottom: 12px;

  &:last-child {
    border: none;
  }

  .PeriodCard-NumberBlock {
    display: flex;
    flex-direction: column;
    margin: 12px;
  }

  .PeriodCard-Number {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-white;
    background-color: $color-base-color-06;
    width: 40px;
    border-radius: 3em;
    padding: 12px 4px;
    margin-bottom: 8px;

    .PeriodCard-Number-Num {
      font-size: 22px;
    }

    .PeriodCard-Number-Text {
      font-size: 8px;
      font-weight: bold;
    }
  }

  .PeriodCard-Time {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 10px;
    color: $color-white;
  }
}
</style>
