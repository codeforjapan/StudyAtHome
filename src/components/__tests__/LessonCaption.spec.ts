import { shallowMount } from '@vue/test-utils'
import LessonCaption from '../LessonCaption.vue'

describe('LessonCaption.vue', () => {
  test('renders props with default value', () => {
    const dt = Date.now()
    const wrapper = shallowMount(LessonCaption, {
      propsData: {
        startTime: dt,
        endTime: dt
      }
    })
    expect(wrapper.vm.$props.title).toBe('1')
    expect(wrapper.vm.$props.unit).toBe('時間目')
  })

  test('renders props.title when passed', () => {
    const dt = Date.now()
    const wrapper = shallowMount(LessonCaption, {
      propsData: {
        title: 'はじめの',
        unit: 'じかん',
        startTime: dt,
        endTime: dt
      }
    })
    expect(wrapper.vm.$props.title).toBe('はじめの')
    expect(wrapper.vm.$props.unit).toBe('じかん')
    expect(wrapper.text()).toMatch('はじめの')
    expect(wrapper.text()).toMatch('じかん')
  })

  test('renders props.startTime / endTime (AM)', () => {
    const dt1 = new Date('2020-05-20T00:00:00.000+0900')
    const dt2 = new Date('2020-05-20T09:09:09.009+0900')
    const wrapper = shallowMount(LessonCaption, {
      propsData: {
        startTime: dt1,
        endTime: dt2
      }
    })
    expect(wrapper.vm.$props.startTime.toISOString()).toBe(dt1.toISOString())
    expect(wrapper.vm.$props.endTime.toISOString()).toBe(dt2.toISOString())
    expect(wrapper.text()).toMatch('12:00|9:09')
  })

  test('renders props.startTime / endTime (PM)', () => {
    const dt1 = new Date('2020-05-20T12:34:56.789+0900')
    const dt2 = new Date('2020-05-20T23:59:59.999+0900')
    const wrapper = shallowMount(LessonCaption, {
      propsData: {
        startTime: dt1,
        endTime: dt2
      }
    })
    expect(wrapper.vm.$props.startTime.toISOString()).toBe(dt1.toISOString())
    expect(wrapper.vm.$props.endTime.toISOString()).toBe(dt2.toISOString())
    expect(wrapper.text()).toMatch('12:34|11:59')
  })
})
