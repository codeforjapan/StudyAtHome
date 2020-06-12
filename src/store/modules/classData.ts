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

  public get getLessonsByDisplayDate(): Lessons {
    const appStore = createProxy(this.$store, AppStore)
    const dateStart = new Date(
      appStore.displayDate.getFullYear(),
      appStore.displayDate.getMonth(),
      appStore.displayDate.getDate(),
      0,
      0,
      0
    )
    const dateEnd = new Date(
      appStore.displayDate.getFullYear(),
      appStore.displayDate.getMonth(),
      appStore.displayDate.getDate(),
      23,
      59,
      59
    )
    const lessonsByDate: Lessons = []
    this.lessons.forEach(value => {
      const sec = value.startTime.getTime()
      if (dateStart.getTime() <= sec && dateEnd.getTime() >= sec)
        lessonsByDate.push(value)
    })
    return lessonsByDate
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
