import { createModule, mutation, action } from 'vuex-class-component'
import dayjs from 'dayjs'
import firebase from '@/plugins/firebase'
import Timestamp = firebase.firestore.Timestamp

const VuexModule = createModule({
  namespaced: 'classData',
  strict: false,
  target: 'nuxt'
})

type ClassId = string
type ClassName = string
type Lessons = Lesson[]
type DisplayDate = Date

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
  displayDate: DisplayDate
}

export class ClassDataStore extends VuexModule implements ClassData {
  classId: ClassId = ''
  className: ClassName = ''
  lessons: Lessons = []
  displayDate: DisplayDate = new Date()

  public get getLessonsByDisplayDate(): Lessons {
    const dateStart = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      this.displayDate.getDate(),
      0,
      0,
      0
    )
    const dateEnd = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      this.displayDate.getDate(),
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

  @mutation
  public nextDate() {
    this.displayDate = dayjs(this.displayDate)
      .add(1, 'd')
      .toDate()
  }

  @mutation
  public prevDate() {
    this.displayDate = dayjs(this.displayDate)
      .subtract(1, 'd')
      .toDate()
  }

  @mutation
  public setDate(date: Date) {
    this.displayDate = date
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

  @action
  public async addLesson(lessonData: Object) {
    await firebase
      .firestore()
      .collection('classData')
      .doc(this.classId)
      .collection('Lessons')
      .add(lessonData)
      .catch(() => {
        return Promise.reject(new Error('エラーによって処理に失敗しました'))
      })
    this.loadClassData(this.classId)
  }
}
