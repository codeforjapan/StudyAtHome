<template>
  <v-container fill-height class="calendar-bar">
    <v-row justify="space-between" class="pa-0 ma-0">
      <v-btn text color="#0071C2" @click="dateListWindow.prevList">
        <v-icon>mdi-menu-left</v-icon>
        {{ $t('common.calender.prev_week') }}
      </v-btn>
      <v-btn text color="#0071C2" @click="$emit('showCalender')">
        {{ fmtym(dateListWindow.currentDate) }}
        <v-icon>mdi-calendar-today</v-icon>
      </v-btn>
      <v-btn text color="#0071C2" @click="dateListWindow.nextList">
        {{ $t('common.calender.next_week') }}
        <v-icon>mdi-menu-right</v-icon>
      </v-btn>
    </v-row>
    <v-row align="center" class="pa-0 ma-0">
      <v-col cols="1" class="pa-0 ma-1">
        <v-card class="calendar-bar-ym" flat>
          <v-card-title class="calendar-bar-ym-title">
            {{ currentMonthString() }}
          </v-card-title>
          <v-card-subtitle class="calendar-bar-ym-subtitle">
            {{ currentYearString() }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col
        v-for="date in dateListWindow.list"
        :key="fmtft(date)"
        v-touch="{
          left: () => dateListWindow.nextList(),
          right: () => dateListWindow.prevList(),
        }"
        cols="0"
        class="pa-0 ma-0"
      >
        <v-card
          class="calendar-bar-date elevation-4"
          :class="{
            current: fmtft(date) === fmtft(dateListWindow.currentDate),
          }"
          @click="dateListWindow.selectDate(date)"
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
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'

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
  inputHandler: (value: Date) => Date
  selectDate(date: Date): DateListWindow
  nextDay(): DateListWindow
  prevDay(): DateListWindow
  nextWeek(): DateListWindow
  prevWeek(): DateListWindow
  nextList(): DateListWindow
  prevList(): DateListWindow
}

class DateListWindowImpl implements DateListWindow {
  view: View
  startWeekOn: StartWeekOn
  currentDate: Date
  list: Array<Date>
  inputHandler: (value: Date) => Date

  constructor(
    view: View = 'Week',
    startWeekOn: StartWeekOn = 'Monday',
    date: Date = new Date(),
    inputHandler: (value: Date) => Date
  ) {
    this.view = view
    this.startWeekOn = view === 'Weekday' ? 'Monday' : startWeekOn
    this.currentDate = this.calcCurrentDate(
      view,
      dayjs(date).isValid() ? date : new Date()
    )
    this.list = this.generateDateList(
      this.view,
      this.startWeekOn,
      this.currentDate
    )
    this.inputHandler = inputHandler
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
  nextList = (): DateListWindow =>
    this.view === 'Day' ? this.nextDay() : this.nextWeek()

  prevList = (): DateListWindow =>
    this.view === 'Day' ? this.prevDay() : this.prevWeek()

  selectDate(date: Date): DateListWindow {
    this.currentDate = this.calcCurrentDate(
      this.view,
      dayjs(date).isValid() ? date : new Date()
    )
    this.list = this.generateDateList()

    // CalendarBar を経由して変更を通知
    this.inputHandler(this.currentDate)
    return this
  }

  private calcCurrentDate(view: View, date: Date): Date {
    let currentDate: Date = date
    if (view === 'Weekday' && date.getDay() === 0) {
      currentDate = dayjs(date).add(1, 'd').toDate()
    }
    return currentDate
  }

  private addDays(value: number): DateListWindow {
    return this.selectDate(dayjs(this.currentDate).add(value, 'd').toDate())
  }

  private firstDateOfList: (
    view: View,
    startWeekOn: StartWeekOn,
    date: Date
  ) => Date = function (view: View, startWeekOn: StartWeekOn, date: Date) {
    const dowList: Array<StartWeekOn> = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
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
        firstDate = dayjs(date)
          .add((startDay - (7 + date.getDay())) % 7, 'd')
          .toDate()
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
      list[i] = dayjs(firstDate).add(i, 'd').toDate()
    }
    return list
  }
}

@Component
export default class CalendarBar extends Vue {
  dateListWindow: DateListWindow = new DateListWindowImpl(
    'Week',
    'Monday',
    new Date(),
    this.input
  )

  @Prop({
    default() {
      return { view: 'Week', startWeekOn: 'Monday' }
    },
  })
  config: CalendarBarConfig | undefined

  @Prop({
    default() {
      return new Date()
    },
  })
  public value!: Date

  constructor() {
    super()
    this.dateListWindow = new DateListWindowImpl(
      this.config?.view ?? 'Week',
      this.config?.startWeekOn ?? 'Monday',
      this.value ?? new Date(),
      this.input
    )
  }

  @Emit()
  public input(value: Date) {
    return value
  }

  @Watch('value', { immediate: true })
  onValueChanged(newValue: Date) {
    this.dateListWindow.selectDate(newValue)
  }

  currentMonthString(): string {
    return this.$dayjs(this.dateListWindow.currentDate).format('MMM')
  }

  currentYearString(): string {
    return this.$dayjs(this.dateListWindow.currentDate).format('YYYY')
  }

  fmtd(date: Date): String {
    return this.$dayjs(date).format('D')
  }

  fmteeeee(date: Date): String {
    return this.$dayjs(date).format('ddd')
  }

  fmtft(date: Date): String {
    return this.$dayjs(date).format('YYYY-MM-DD HH:mm:ss ddd')
  }

  fmtym(date: Date): String {
    return this.$dayjs(date).format('YYYY MMM')
  }
}
</script>

<style lang="scss" scoped>
.calendar-bar {
  color: $color-white;
  font-size: small;
  padding: 0 0;
}

.calendar-bar-ym {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  height: 68px;
  min-width: 12px;

  .title {
    color: $color-base-color-01;
    font-size: 12px;
  }

  .subtitle {
    color: $color-white;
    font-size: 10px;
  }
}

.calendar-bar-ym-title {
  color: $color-base-color-01;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 0 0 0;
}

.calendar-bar-ym-subtitle {
  color: $color-white !important;
  font-size: 10px;
  font-weight: bold;
  padding: 8px 2px 0;
}

.calendar-bar-date {
  display: flex;
  flex-direction: column;
  background: $color-white;
  height: 68px;
  min-width: 1rem;
  max-width: 3rem;
  border-radius: 3em !important;
  align-items: center;
  justify-content: center;
  color: $color-gray;
  margin: 0 3px;
}

.calendar-bar-date.current {
  background: $color-yellow;
}

.calendar-bar-date-title {
  color: $color-gray;
  font-size: 8px;
  padding: 8px 0 0 0;
}

.calendar-bar-date-subtitle {
  color: $color-gray !important;
  font-size: 22px;
  padding: 8px 2px 16px;
}
</style>
