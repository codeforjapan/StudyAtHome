// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
// Utilities
import {
  createLocalVue,
  mount,
  // RouterLinkStub,
  // shallowMount,
  Wrapper
} from '@vue/test-utils'
// Components
import formatISO from 'date-fns/formatISO'
import CalendarBar from '../CalendarBar.vue'
// import View from '../CalendarBar.vue'
// import StartWeekOn from '../CalendarBar.vue'
// import DateListWindow from '../CalendarBar.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
let wrapper: Wrapper<CalendarBar> | null

let vuetify: any

// const shallowMountFunction: (options: any) => Wrapper<CalendarBar> = function(
//   options
// ) {
//   return shallowMount(CalendarBar, {
//     ...options
//   })
// }

const mountFunction: (options: any) => Wrapper<CalendarBar> = function(
  options
) {
  return mount(CalendarBar, {
    localVue,
    vuetify,
    // stubs: { RouterLink: RouterLinkStub },
    ...options
  })
}

describe('CalendarBar.vue', () => {
  beforeEach(() => {
    wrapper = null
    vuetify = new Vuetify()
  })

  test('sets the correct default data with no props', () => {
    const wrapper = mountFunction({})
    const dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.view).toBe('Week')
    expect(dateListWindow.startWeekOn).toBe('Monday')
    expect(
      formatISO(dateListWindow.currentDate, { representation: 'date' })
    ).toBe(formatISO(new Date(), { representation: 'date' }))
  })

  test('sets props correctly', () => {
    // 2020-05-08T10:00:00.000+0900
    const dt = new Date(2020, 4, 8, 10, 0, 0, 0)
    const wrapper = mountFunction({
      propsData: { value: dt, config: { view: 'V', startWeekOn: 'DOW' } }
    })
    expect(wrapper.props().value).toBe(dt)
    expect(wrapper.props().config.view).toBe('V')
    expect(wrapper.props().config.startWeekOn).toBe('DOW')
  })

  /**
   *                             2020
   *        April                  May                   June
   * Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
   *           1  2  3  4                  1  2      1  2  3  4  5  6
   *  5  6  7  8  9 10 11   3  4  5  6  7  8  9   7  8  9 10 11 12 13
   * 12 13 14 15 16 17 18  10 11 12 13 14 15 16  14 15 16 17 18 19 20
   * 19 20 21 22 23 24 25  17 18 19 20 21 22 23  21 22 23 24 25 26 27
   * 26 27 28 29 30        24 25 26 27 28 29 30  28 29 30
   *                       31
   */

  test('renders date list of the day', () => {
    const dt = new Date(2020, 4, 3, 10, 0, 0, 0)
    let dateListWindow

    wrapper = mountFunction({
      propsData: {
        value: dt,
        config: { view: 'Day', startWeekOn: 'Sunday' }
      }
    })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(Array.of(dt))

    wrapper = mountFunction({
      propsData: {
        value: dt,
        config: { view: 'Day', startWeekOn: 'Monday' }
      }
    })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(Array.of(dt))
  })

  test('renders date list of the week', () => {
    const dt = new Date(2020, 4, 8, 10, 0, 0, 0)
    const xList = Array.of<Date>(
      new Date(2020, 4, 3, 10, 0, 0, 0),
      new Date(2020, 4, 4, 10, 0, 0, 0),
      new Date(2020, 4, 5, 10, 0, 0, 0),
      new Date(2020, 4, 6, 10, 0, 0, 0),
      new Date(2020, 4, 7, 10, 0, 0, 0),
      new Date(2020, 4, 8, 10, 0, 0, 0),
      new Date(2020, 4, 9, 10, 0, 0, 0)
    )
    const props = (pDate: Date, pDow: string) => ({
      value: pDate,
      config: { view: 'Week', startWeekOn: pDow }
    })
    let dateListWindow

    // 2020-05-03 ~ 2020-05-09
    for (let n = 3; n <= 9; n++) {
      const dtx = new Date(2020, 4, n, 10, 0, 0, 0)
      wrapper = mountFunction({ propsData: props(dtx, 'Sunday') })
      dateListWindow = wrapper.vm.$data.dateListWindow
      expect(dateListWindow.currentDate).toStrictEqual(dtx)
      expect(dateListWindow.list).toStrictEqual(xList)
    }

    wrapper = mountFunction({ propsData: props(dt, 'Monday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(
      Array.of<Date>(
        new Date(2020, 4, 4, 10, 0, 0, 0),
        new Date(2020, 4, 5, 10, 0, 0, 0),
        new Date(2020, 4, 6, 10, 0, 0, 0),
        new Date(2020, 4, 7, 10, 0, 0, 0),
        new Date(2020, 4, 8, 10, 0, 0, 0),
        new Date(2020, 4, 9, 10, 0, 0, 0),
        new Date(2020, 4, 10, 10, 0, 0, 0)
      )
    )

    wrapper = mountFunction({ propsData: props(dt, 'Tuesday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(
      Array.of<Date>(
        new Date(2020, 4, 5, 10, 0, 0, 0),
        new Date(2020, 4, 6, 10, 0, 0, 0),
        new Date(2020, 4, 7, 10, 0, 0, 0),
        new Date(2020, 4, 8, 10, 0, 0, 0),
        new Date(2020, 4, 9, 10, 0, 0, 0),
        new Date(2020, 4, 10, 10, 0, 0, 0),
        new Date(2020, 4, 11, 10, 0, 0, 0)
      )
    )

    wrapper = mountFunction({ propsData: props(dt, 'Wednesday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(
      Array.of<Date>(
        new Date(2020, 4, 6, 10, 0, 0, 0),
        new Date(2020, 4, 7, 10, 0, 0, 0),
        new Date(2020, 4, 8, 10, 0, 0, 0),
        new Date(2020, 4, 9, 10, 0, 0, 0),
        new Date(2020, 4, 10, 10, 0, 0, 0),
        new Date(2020, 4, 11, 10, 0, 0, 0),
        new Date(2020, 4, 12, 10, 0, 0, 0)
      )
    )

    wrapper = mountFunction({ propsData: props(dt, 'Thursday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(
      Array.of<Date>(
        new Date(2020, 4, 7, 10, 0, 0, 0),
        new Date(2020, 4, 8, 10, 0, 0, 0),
        new Date(2020, 4, 9, 10, 0, 0, 0),
        new Date(2020, 4, 10, 10, 0, 0, 0),
        new Date(2020, 4, 11, 10, 0, 0, 0),
        new Date(2020, 4, 12, 10, 0, 0, 0),
        new Date(2020, 4, 13, 10, 0, 0, 0)
      )
    )

    wrapper = mountFunction({ propsData: props(dt, 'Friday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(
      Array.of<Date>(
        new Date(2020, 4, 8, 10, 0, 0, 0),
        new Date(2020, 4, 9, 10, 0, 0, 0),
        new Date(2020, 4, 10, 10, 0, 0, 0),
        new Date(2020, 4, 11, 10, 0, 0, 0),
        new Date(2020, 4, 12, 10, 0, 0, 0),
        new Date(2020, 4, 13, 10, 0, 0, 0),
        new Date(2020, 4, 14, 10, 0, 0, 0)
      )
    )

    wrapper = mountFunction({ propsData: props(dt, 'Saturday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(
      Array.of<Date>(
        new Date(2020, 4, 2, 10, 0, 0, 0),
        new Date(2020, 4, 3, 10, 0, 0, 0),
        new Date(2020, 4, 4, 10, 0, 0, 0),
        new Date(2020, 4, 5, 10, 0, 0, 0),
        new Date(2020, 4, 6, 10, 0, 0, 0),
        new Date(2020, 4, 7, 10, 0, 0, 0),
        new Date(2020, 4, 8, 10, 0, 0, 0)
      )
    )
  })

  test('renders date list of the weekday', () => {
    const dt = new Date(2020, 4, 8, 10, 0, 0, 0)
    const xList = Array.of<Date>(
      new Date(2020, 4, 4, 10, 0, 0, 0),
      new Date(2020, 4, 5, 10, 0, 0, 0),
      new Date(2020, 4, 6, 10, 0, 0, 0),
      new Date(2020, 4, 7, 10, 0, 0, 0),
      new Date(2020, 4, 8, 10, 0, 0, 0),
      new Date(2020, 4, 9, 10, 0, 0, 0)
    )
    const props = (pDate: Date, pDow: string) => ({
      value: pDate,
      config: { view: 'Weekday', startWeekOn: pDow }
    })
    let dateListWindow

    // 2020-05-03(Sun)
    wrapper = mountFunction({
      propsData: props(new Date(2020, 4, 3, 10, 0, 0, 0), 'Sunday')
    })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 4, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(xList)

    // 2020-05-04(Mon) ~ 2020-05-09(Sat)
    for (let n = 4; n <= 9; n++) {
      const dtx = new Date(2020, 4, n, 10, 0, 0, 0)
      wrapper = mountFunction({ propsData: props(dtx, 'Sunday') })
      dateListWindow = wrapper.vm.$data.dateListWindow
      expect(dateListWindow.currentDate).toStrictEqual(dtx)
      expect(dateListWindow.list).toStrictEqual(xList)
    }

    wrapper = mountFunction({ propsData: props(dt, 'Sunday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)

    wrapper = mountFunction({ propsData: props(dt, 'Monday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)

    wrapper = mountFunction({ propsData: props(dt, 'Tuesday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)

    wrapper = mountFunction({ propsData: props(dt, 'Wednesday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)

    wrapper = mountFunction({ propsData: props(dt, 'Thursday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)

    wrapper = mountFunction({ propsData: props(dt, 'Friday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)

    wrapper = mountFunction({ propsData: props(dt, 'Saturday') })
    dateListWindow = wrapper.vm.$data.dateListWindow
    expect(dateListWindow.currentDate).toStrictEqual(dt)
    expect(dateListWindow.list).toStrictEqual(xList)
  })

  test('manipulate date list of the day', () => {
    const dt = new Date(2020, 4, 3, 10, 0, 0, 0)
    let dtx: Date

    wrapper = mountFunction({
      propsData: {
        value: dt,
        config: { view: 'Day', startWeekOn: 'Sunday' }
      }
    })
    const dateListWindow = wrapper.vm.$data.dateListWindow

    dtx = dt
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))

    // prevDay()
    dtx = new Date(2020, 4, 2, 10, 0, 0, 0)
    dateListWindow.prevDay()
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))

    // nextDay()
    dtx = dt
    dateListWindow.nextDay()
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))

    // prevWeek()
    dtx = new Date(2020, 3, 26, 10, 0, 0, 0)
    dateListWindow.prevWeek()
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))

    // nextWeek()
    dtx = dt
    dateListWindow.nextWeek()
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))

    // selectDate()
    dtx = new Date(2020, 4, 5, 10, 0, 0, 0)
    dateListWindow.selectDate(dtx)
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))
    dtx = new Date(2020, 3, 30, 10, 0, 0, 0)
    dateListWindow.selectDate(dtx)
    expect(dateListWindow.currentDate).toStrictEqual(dtx)
    expect(dateListWindow.list).toStrictEqual(Array.of(dtx))
  })

  test('manipulate date list of the week', () => {
    const dt = new Date(2020, 4, 3, 10, 0, 0, 0)
    const list1 = Array.of<Date>(
      new Date(2020, 4, 3, 10, 0, 0, 0),
      new Date(2020, 4, 4, 10, 0, 0, 0),
      new Date(2020, 4, 5, 10, 0, 0, 0),
      new Date(2020, 4, 6, 10, 0, 0, 0),
      new Date(2020, 4, 7, 10, 0, 0, 0),
      new Date(2020, 4, 8, 10, 0, 0, 0),
      new Date(2020, 4, 9, 10, 0, 0, 0)
    )
    const list2 = Array.of<Date>(
      new Date(2020, 3, 26, 10, 0, 0, 0),
      new Date(2020, 3, 27, 10, 0, 0, 0),
      new Date(2020, 3, 28, 10, 0, 0, 0),
      new Date(2020, 3, 29, 10, 0, 0, 0),
      new Date(2020, 3, 30, 10, 0, 0, 0),
      new Date(2020, 4, 1, 10, 0, 0, 0),
      new Date(2020, 4, 2, 10, 0, 0, 0)
    )

    wrapper = mountFunction({
      propsData: {
        value: dt,
        config: { view: 'Week', startWeekOn: 'Sunday' }
      }
    })
    const dateListWindow = wrapper.vm.$data.dateListWindow

    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 3, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list1)

    // prevDay()
    dateListWindow.prevDay()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 2, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list2)

    // nextDay()
    dateListWindow.nextDay()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 3, 10, 0, 0, 0)
    )

    // nextWeek()
    dateListWindow.prevWeek()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 3, 26, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list2)

    // nextWeek()
    dateListWindow.nextWeek()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 3, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list1)

    // selectDate()
    let dt2 = new Date(2020, 4, 5, 10, 0, 0, 0)
    dateListWindow.selectDate(dt2)
    expect(dateListWindow.currentDate).toStrictEqual(dt2)
    expect(dateListWindow.list).toStrictEqual(list1)
    dt2 = new Date(2020, 3, 30, 10, 0, 0, 0)
    dateListWindow.selectDate(dt2)
    expect(dateListWindow.currentDate).toStrictEqual(dt2)
    expect(dateListWindow.list).toStrictEqual(list2)
  })

  test('manipulate date list of the weekday', () => {
    const dt = new Date(2020, 4, 3, 10, 0, 0, 0)
    const list1 = Array.of<Date>(
      new Date(2020, 4, 4, 10, 0, 0, 0),
      new Date(2020, 4, 5, 10, 0, 0, 0),
      new Date(2020, 4, 6, 10, 0, 0, 0),
      new Date(2020, 4, 7, 10, 0, 0, 0),
      new Date(2020, 4, 8, 10, 0, 0, 0),
      new Date(2020, 4, 9, 10, 0, 0, 0)
    )
    const list2 = Array.of<Date>(
      new Date(2020, 3, 27, 10, 0, 0, 0),
      new Date(2020, 3, 28, 10, 0, 0, 0),
      new Date(2020, 3, 29, 10, 0, 0, 0),
      new Date(2020, 3, 30, 10, 0, 0, 0),
      new Date(2020, 4, 1, 10, 0, 0, 0),
      new Date(2020, 4, 2, 10, 0, 0, 0)
    )

    wrapper = mountFunction({
      propsData: {
        value: dt,
        config: { view: 'Weekday', startWeekOn: 'Sunday' }
      }
    })
    const dateListWindow = wrapper.vm.$data.dateListWindow

    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 4, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list1)

    // prevDay()
    dateListWindow.prevDay()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 2, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list2)

    // nextDay()
    dateListWindow.nextDay()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 4, 10, 0, 0, 0)
    )

    // nextWeek()
    dateListWindow.prevWeek()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 3, 27, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list2)

    // nextWeek()
    dateListWindow.nextWeek()
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 4, 4, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list1)

    // selectDate()
    dateListWindow.selectDate(new Date(2020, 3, 26, 10, 0, 0, 0))
    expect(dateListWindow.currentDate).toStrictEqual(
      new Date(2020, 3, 27, 10, 0, 0, 0)
    )
    expect(dateListWindow.list).toStrictEqual(list2)
  })
})
