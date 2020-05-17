import { createModule, mutation, action } from 'vuex-class-component'
import dayjs from 'dayjs'
import firebase from '@/plugins/firebase'

const VuexModule = createModule({
  namespaced: 'class',
  strict: false,
  target: 'nuxt'
})

export interface Class {
  schoolName: string
  className: string
  lessons: {
    [key: string]: Lesson
  }
}

export interface Lesson {
  subject: string
  content: string
  startTime: Date
  endTime: Date
}

type SetPayloadType = {
  classId: string
  classData: Class
}

export class ClassStore extends VuexModule {
  classId: string = ''
  classData: Class = {
    schoolName: '',
    className: '',
    lessons: {}
  }

  displayDate: string = ''

  public get isLoaded(): boolean {
    return !this.classData.schoolName && !this.classData.className
  }

  @mutation
  private SET({ classId, classData }: SetPayloadType) {
    this.classId = classId
    this.classData = classData
  }

  @mutation
  private nextDate() {
    this.displayDate = dayjs(this.displayDate)
      .add(1, 'd')
      .format('YYYY-MM-DD')
  }

  @mutation
  private prevDate() {
    this.displayDate = dayjs(this.displayDate)
      .subtract(1, 'd')
      .format('YYYY-MM-DD')
  }

  @action
  public async loadClassData(classId: string) {
    const classDataSnapshot = await firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .get()
    const data = classDataSnapshot.data() as Class
    this.SET({
      classId,
      classData: data
    })
  }
}
