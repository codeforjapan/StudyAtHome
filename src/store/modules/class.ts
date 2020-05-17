import { createModule, mutation, action } from 'vuex-class-component'
import dayjs from 'dayjs'

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
  public nextDate() {
    this.displayDate = dayjs(this.displayDate)
      .add(1, 'd')
      .format('YYYY-MM-DD')
  }

  @mutation
  public prevDate() {
    this.displayDate = dayjs(this.displayDate)
      .subtract(1, 'd')
      .format('YYYY-MM-DD')
  }

  @action
  public async loadClassData(classId: string) {
    const classDataSnapshot = await this.$store.$fireStore
      .collection('classData')
      .doc(classId)
      .get()
    const data = classDataSnapshot.data() as Class
    this.classData = data
    this.classId = classId
  }
}
