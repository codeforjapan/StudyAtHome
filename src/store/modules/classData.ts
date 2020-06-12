import {
  createModule,
  mutation,
  action,
  createProxy
} from 'vuex-class-component'
import firebase from '@/plugins/firebase'
import { AppStore } from '@/store/modules/app'
import Timestamp = firebase.firestore.Timestamp

const VuexModule = createModule({
  namespaced: 'classData',
  strict: false,
  target: 'nuxt'
})

type ClassId = string
type ClassName = string
type Lessons = Lesson[]

interface Lesson {
  subject: string
  content: string
  startTime: Date
  endTime: Date
}

interface RawLesson {
  subject: string
  content: string
  startTime: Timestamp
  endTime: Timestamp
}

interface RawClassData {
  className: ClassName
  lessons: Lessons
}

interface ClassData {
  classId: ClassId
  className: ClassName
  lessons: Lessons
}

export class ClassDataStore extends VuexModule implements ClassData {
  classId: ClassId = ''
  className: ClassName = ''
  lessons: Lessons = []

  public get lessonsOnCurrentDate(): Lessons {
    const appStore = createProxy(this.$store, AppStore)

    // Generate a new Date object with a specified date & time
    const d = (date: Date, hours: number, minutes: number, seconds: number) => {
      const newDate = new Date(date)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      newDate.setSeconds(seconds)
      return newDate
    }
    const start = d(appStore.currentDate, 0, 0, 0).getTime()
    const end = d(appStore.currentDate, 23, 59, 59).getTime()

    return this.lessons.filter(lesson => {
      const startOfLesson = lesson.startTime.getTime()
      return start <= startOfLesson && end >= startOfLesson
    })
  }

  public get isLoaded(): boolean {
    return !!this.className
  }

  @mutation
  private setClassId(classId: ClassId) {
    this.classId = classId
  }

  @mutation
  private setDataFromRawClassData({ className, lessons }: RawClassData) {
    this.className = className
    this.lessons = lessons
  }

  @action
  public async loadClassData(classId: ClassId) {
    let className = ''
    const lessons: Lesson[] = []
    await firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .collection('Lessons')
      .orderBy('startTime')
      .get()
      .then(QuerySnapshot => {
        QuerySnapshot.forEach(function(doc) {
          const data = doc.data() as RawLesson
          const reformatData = {
            subject: data.subject,
            content: data.content,
            startTime: data.startTime.toDate(),
            endTime: new Date()
          }
          lessons.push(reformatData)
        })
      })
      .catch(() => {
        return Promise.reject(new Error('クラスIDが間違っています'))
      })

    await firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .get()
      .then(snapshot => {
        if (!snapshot.exists)
          return Promise.reject(new Error('クラスIDが間違っています'))

        const data = snapshot.data() as ClassData
        className = data.className
      })
    this.setClassId(classId)
    this.setDataFromRawClassData({
      className,
      lessons
    })
  }
}
