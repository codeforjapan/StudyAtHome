import { createModule, mutation, action } from 'vuex-class-component'
import dayjs from 'dayjs'
import firebase from '@/plugins/firebase'

const VuexModule = createModule({
  namespaced: 'class',
  strict: false,
  target: 'nuxt'
})

type ClassId = string
type ClassName = string
type SchoolName = string
type Lessons = { [key: string]: Lesson }
type DisplayDate = string

interface Lesson {
  subject: string
  content: string
  startTime: Date
  endTime: Date
}

interface RawClassData {
  schoolName: ClassName
  className: SchoolName
  lessons: Lessons
}

interface ClassData {
  classId: ClassId
  schoolName: ClassName
  className: SchoolName
  lessons: Lessons
  displayDate: DisplayDate
}

export class ClassDataStore extends VuexModule implements ClassData {
  classId: ClassId = ''
  className: ClassName = ''
  schoolName: SchoolName = ''
  lessons: Lessons = {}
  displayDate: DisplayDate = ''

  public get isLoaded(): boolean {
    return !!this.schoolName && !!this.className
  }

  @mutation
  private setClassId(classId: ClassId) {
    this.classId = classId
  }

  @mutation
  private setDataFromRawClassData({
    className,
    schoolName,
    lessons
  }: RawClassData) {
    this.className = className
    this.schoolName = schoolName
    this.lessons = lessons
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
  public async loadClassData(classId: ClassId) {
    return firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .get()
      .then(snapshot => {
        if (!snapshot.exists)
          return Promise.reject(new Error('クラスIDが間違っています'))

        const { className, schoolName, lessons } = snapshot.data() as ClassData
        this.setClassId(classId)
        this.setDataFromRawClassData({
          className,
          schoolName,
          lessons
        })
      })
  }
}
