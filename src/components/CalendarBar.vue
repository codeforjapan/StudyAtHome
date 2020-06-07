<template>
  <v-container fill-height class="calendar-bar">
    <v-row align="center" class="pa-0 ma-0">
      <v-col cols="1" class="pa-0 ma-1">
        <v-card class="calendar-bar-ym" flat>
          <v-card-title class="calendar-bar-ym-title">
            {{ currentMonthString }}
          </v-card-title>
          <v-card-subtitle class="calendar-bar-ym-subtitle">
            {{ currentYearString }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col
        v-for="date in dateListWindow.list"
        :key="fmtft(date)"
        v-touch="{
          left: () => dateListWindow.nextList(),
          right: () => dateListWindow.prevList()
        }"
        cols="0"
        class="pa-0 ma-0"
      >
        <v-card
          class="calendar-bar-date elevation-4"
          :class="{
            current: fmtft(date) === fmtft(dateListWindow.currentDate)
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
  nextList(): DateListWindow
  prevList(): DateListWindow
}

class DateListWindowImpl implements DateListWindow {
  view: View
  startWeekOn: StartWeekOn
  currentDate: Date
  list: Array<Date>

  constructor(
    view: View = 'Week',
    startWeekOn: StartWeekOn = 'Monday',
    date: Date = new Date()
  ) {
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
  nextList = (): DateListWindow =>
    this.view === 'Day' ? this.nextDay() : this.nextWeek()

  prevList = (): DateListWindow =>
    this.view === 'Day' ? this.prevDay() : this.prevWeek()

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
    return this.selectDate(add(this.currentDate, { days: value }))
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
  @Prop({
    default() {
      return { view: 'Week', startWeekOn: 'Monday' }
    }
  })
  config: CalendarBarConfig | undefined

  @Prop({
    default() {
      return new Date()
    }
  })
  public value!: Date

  dateListWindow: DateListWindow = new DateListWindowImpl(
    this.config?.view ?? 'Week',
    this.config?.startWeekOn ?? 'Monday',
    this.date ?? new Date()
  )

  @Emit('changeCurrentDate')
  changeCurrentDate(): Date {
    return this.dateListWindow.currentDate
  }

  private get date(): Date {
    return this.value
  }

  @Emit()
  public input(value: Date) {
    return value
  }

  @Watch('dateListWindow.currentDate', { immediate: true })
  // @Watch('dateListWindow.currentDate')
  onChangeCurrentDate() {
    this.input(this.dateListWindow.currentDate)
    this.changeCurrentDate()
  }

  get currentMonthString(): string {
    return format(this.dateListWindow.currentDate, 'M') + '月'
  }

  get currentYearString(): string {
    return format(this.dateListWindow.currentDate, 'yyyy')
  }

  fmtd(date: Date): String {
    return format(date, 'd')
  }

  fmteeeee(date: Date): String {
    return format(date, 'EEEEE', { locale: ja })
  }

  fmtft(date: Date): String {
    return format(date, 'yyyy-MM-dd HH:mm:ss EEE')
  }

  fmtISO(date: Date): String {
    return formatISO(date)
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
  font-family: 'Noto Sans JP', sans-serif;

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
  min-width: 16px;
  border-radius: 30px !important;
  align-items: center;
  justify-content: center;
  color: $color-gray;
  font-family: 'Noto Sans JP', sans-serif;
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
