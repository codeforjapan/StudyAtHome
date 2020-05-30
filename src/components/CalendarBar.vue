<style scoped lang="scss">
.calendar-bar {
  font-size: small;
  color: #fff;
}

.calendar-bar-ym {
  display: flex;
  flex-direction: column;
  color: #292a2b;
  height: 68px;
  min-width: 12px;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 12px;
  }
  .subtitle {
    font-size: 10px;
  }
}

.calendar-bar-ym-title {
  color: #0d2671;
  font-size: 12px;
  padding: 8px 0 0 0;
  align-items: center;
  justify-content: center;
}

.calendar-bar-ym-subtitle {
  color: #16ac52;
  font-size: 10px;
  padding: 8px 2px 16px;
}

.calendar-bar-date {
  display: flex;
  flex-direction: column;
  background: #fff;
  height: 68px;
  min-width: 16px;
  border-radius: 30px !important;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans', sans-serif;
}

.calendar-bar-date.current {
  background: #ffdb6c !important;
}

.calendar-bar-date-title {
  color: #383834;
  font-size: 8px;
  padding: 8px 0 0 0;
}

.calendar-bar-date-subtitle {
  color: #16ac52;
  font-size: 22px;
  padding: 8px 2px 16px;
}
</style>
<template>
  <v-container fluid fill-height class="calendar-bar">
    <v-row>
      <v-col>
        date: {{ fmtISO(dateListWindow.currentDate) }}, config: { view:
        {{ dateListWindow.view }}, dateListWindow:
        {{ dateListWindow.startWeekOn }} }
      </v-col>
    </v-row>
    <!--    <v-row>-->
    <!--      <v-col>-->
    <!--        <v-btn fab small @click="dateListWindow.prevWeek()">&lt;&lt;</v-btn>-->
    <!--        <v-btn fab small @click="dateListWindow.prevDay()">&lt;</v-btn>-->
    <!--        <v-btn fab small @click="dateListWindow.selectDate(new Date())"-->
    <!--          >Today-->
    <!--        </v-btn>-->
    <!--        <v-btn fab small @click="dateListWindow.nextDay()">&gt;</v-btn>-->
    <!--        <v-btn fab small @click="dateListWindow.nextWeek()">&gt;&gt;</v-btn>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxx -->
    <v-row align="center">
      <!-- m/yyyy -->
      <v-col>
        <v-card class="calendar-bar-ym">
          <v-card-title class="calendar-bar-ym-title">
            {{ fmtM(dateListWindow.currentDate) }}月
          </v-card-title>
          <v-card-subtitle class="calendar-bar-ym-subtitle">
            {{ fmtyyyy(dateListWindow.currentDate) }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col v-for="date in dateListWindow.list" :key="date">
        <v-card
          class="calendar-bar-date"
          :class="{
            current: fmtft(date) === fmtft(dateListWindow.currentDate)
          }"
          @click.stop="dateListWindow.selectDate(date)"
        >
          <v-card-title class="calendar-bar-date-title">
            {{ fmteeeee(date) }}
          </v-card-title>
          <v-card-subtitle class="calendar-bar-date-subtitle">
            {{ fmtd(date) }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import add from 'date-fns/add'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'
import isValid from 'date-fns/isValid'
import ja from 'date-fns/locale/ja'
export type View = 'Day' | 'Weekday' | 'Week'
export type StartWeekOn =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
export type CalendarBarConfig = {
  view: View
  startWeekOn: StartWeekOn
}

export interface DateListWindow {
  list: Array<Date>
  currentDate: Date

  selectDate(date: Date): DateListWindow

  nextDay(): DateListWindow

  prevDay(): DateListWindow

  nextWeek(): DateListWindow

  prevWeek(): DateListWindow
}

class DateListWindowImpl implements DateListWindow {
  view: View
  startWeekOn: StartWeekOn
  currentDate: Date
  list: Array<Date>

  constructor({
    view = 'Week',
    startWeekOn = 'Monday',
    date = new Date()
  }: {
    view: View
    startWeekOn: StartWeekOn
    date: Date
  }) {
    this.view = view
    this.startWeekOn = view === 'Weekday' ? 'Monday' : startWeekOn
    this.currentDate = this.calcCurrentDate(
      view,
      isValid(date) ? date : new Date()
    )
    this.list = this.generateDateList(
      this.view,
      this.startWeekOn,
      this.currentDate
    )
  }

  nextDay(): DateListWindow {
    if (this.view === 'Weekday' && this.currentDate.getDay() === 6) {
      return this.addDays(2)
    } else {
      return this.addDays(1)
    }
  }

  prevDay(): DateListWindow {
    if (this.view === 'Weekday' && this.currentDate.getDay() === 1) {
      return this.addDays(-2)
    } else {
      return this.addDays(-1)
    }
  }

  nextWeek = (): DateListWindow => this.addDays(7)
  prevWeek = (): DateListWindow => this.addDays(-7)

  selectDate(date: Date): DateListWindow {
    this.currentDate = this.calcCurrentDate(
      this.view,
      isValid(date) ? date : new Date()
    )
    this.list = this.generateDateList()
    return this
  }

  private calcCurrentDate(view: View, date: Date): Date {
    let currentDate: Date = date
    if (view === 'Weekday' && date.getDay() === 0) {
      currentDate = add(date, { days: 1 })
    }
    return currentDate
  }

  private addDays(value: number): DateListWindow {
    this.currentDate = add(this.currentDate, { days: value })
    this.list = this.generateDateList()
    return this
  }

  private firstDateOfList: (
    view: View,
    startWeekOn: StartWeekOn,
    date: Date
  ) => Date = function(view: View, startWeekOn: StartWeekOn, date: Date) {
    const dowList: Array<StartWeekOn> = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    let firstDate: Date = date
    switch (view) {
      case 'Day': {
        firstDate = date
        break
      }
      default: {
        const idx = dowList.indexOf(startWeekOn)
        const startDay: number = idx >= 0 ? idx : 1
        firstDate = add(date, { days: (startDay - (7 + date.getDay())) % 7 })
        break
      }
    }
    return firstDate
  }

  private sizeOfList(view: View): number {
    return view === 'Week' ? 7 : view === 'Weekday' ? 6 : 1
  }

  private generateDateList(
    view: View = this.view,
    startWeekOn: StartWeekOn = this.startWeekOn,
    date: Date = this.currentDate
  ): Array<Date> {
    const firstDate = this.firstDateOfList(view, startWeekOn, date)
    const size: number = this.sizeOfList(view)
    const list = Array<Date>(size)
    for (let i = 0; i < list.length; i++) {
      list[i] = add(firstDate, { days: i })
    }
    return list
  }
}

@Component
export default class CalendarBar extends Vue {
  @Prop({ default: new Date() }) date: Date | undefined
  @Prop({ default: { view: 'Week', startWeekOn: 'Monday' } })
  config: CalendarBarConfig | undefined

  dateListWindow: DateListWindow = new DateListWindowImpl({
    view: this.config?.view ?? 'Week',
    startWeekOn: this.config?.startWeekOn ?? 'Monday',
    date: this.date ?? new Date()
  })

  // currentDate = () => this.dateListWindow.currentDate
  // dateList = () => this.dateListWindow.list

  fmtmd(date: Date): String {
    return format(date, 'M/d')
  }

  fmtd(date: Date): String {
    return format(date, 'd')
  }

  fmtdd(date: Date): String {
    return format(date, 'dd')
  }

  fmteee(date: Date): String {
    return format(date, 'EEE', { locale: ja })
  }

  fmteeeee(date: Date): String {
    return format(date, 'EEEEE', { locale: ja })
  }

  fmtft(date: Date): String {
    return format(date, 'yyyy-MM-dd HH:mm:ss EEE')
  }

  fmtM(date: Date): String {
    return format(date, 'M')
  }

  fmtyyyy(date: Date): String {
    return format(date, 'yyyy')
  }

  fmtISO(date: Date): String {
    return formatISO(date)
  }
}
</script>
