<template>
  <div>
    <v-container class="lessoncaption">
      <v-row>
        <v-col>
          <v-card class="lessoncaption-title">
            <v-card-title class="lessoncaption-title-text">
              {{ title }}
            </v-card-title>
            <v-card-subtitle class="lessoncaption-title-unit">
              {{ unit }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="lessoncaption-time">
      {{ format(startTime) }}<br />|<br />{{ format(endTime) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'LessonCaption',
  props: {
    title: {
      type: String,
      default: '1'
    },
    unit: {
      type: String,
      default: '時間目'
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    }
  },
  methods: {
    format(date: Date): String {
      return dayjs(date).format('h:mm')
    }
  }
})
</script>

<style scoped>
.lessoncaption-title {
  display: flex;
  flex-direction: column;
  background: #015998;
  color: #fff;
  height: 66px;
  border-radius: 22px !important;
  margin: 0 8px;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans', sans-serif;
  order: 1;
}
.lessoncaption-title-text {
  font-family: 'Noto Sans', sans-serif;
  font-size: 28px;
  padding: 10px 2px 0 2px;
  display: flex;
  color: #fff !important;
  align-items: center;
  text-align: center;
}
.lessoncaption-title-unit {
  font-family: 'Noto Sans', sans-serif;
  font-size: 8px;
  margin-top: 0;
  display: flex;
  color: #fff !important;
  align-items: center;
  text-align: center;
}
.lessoncaption-time {
  font-family: 'Noto Sans', sans-serif;
  font-style: normal;
  padding: 0;
  font-weight: normal;
  font-size: 10px;
  text-align: center;
  color: #fff;
  flex: none;
  order: 4;
  align-self: center;
  margin: 0 1px;
}
</style>
