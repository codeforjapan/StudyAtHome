import {
  createModule,
  mutation,
  action,
  createProxy
} from 'vuex-class-component'
import firebase from '@/plugins/firebase'
import { AppStore } from '@/store/modules/app'
import { classData } from '@/types/store/classData'

const VuexModule = createModule({
  namespaced: 'classData',
  strict: false,
  target: 'nuxt'
})

export class ClassDataStore extends VuexModule implements classData.ClassData {
  classId: classData.ClassId = ''
  className: string = ''
  lessons: classData.Lesson[] = []

  public get lessonsOnCurrentDate(): classData.Lesson[] {
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
  private setClassData({ classId, className, lessons }: classData.ClassData) {
    this.classId = classId
    this.className = className
    this.lessons = lessons
  }

  @action
  public async loadClassData(classId: classData.ClassId) {
    const lessons: classData.Lesson[] = []

    const classDataDocument = firebase
      .firestore()
      .collection('classData')
      .doc(classId)

    // classData ドキュメントのフィールドを取得
    const classDataSnapshot = await classDataDocument.get()

    if (!classDataSnapshot.exists) throw new Error('クラスIDが間違っています')
    const classData = classDataSnapshot.data() as classData.ClassData
    const className = classData.className

    // classData ドキュメント下の lessons コレクションを取得
    const classDataLessonsSnapshot = await classDataDocument
      .collection('Lessons')
      .orderBy('startTime')
      .get()

    try {
      classDataLessonsSnapshot.forEach(doc => {
        const retrieved = doc.data() as classData.database.Lesson
        const converted: classData.Lesson = {
          startTime: retrieved.startTime.toDate(),
          endTime: retrieved.endTime.toDate(),
          title: retrieved.title,
          subject: retrieved.subject,
          goal: retrieved.goal,
          description: retrieved.description,
          videos: retrieved.videos,
          pages: retrieved.pages,
          materials: retrieved.materials,
          isHidden: retrieved.isHidden
        }

        lessons.push(converted)
      })
    } catch {
      throw new Error('クラスIDが間違っています')
    }

    this.setClassData({
      classId,
      className,
      lessons
    })
  }
}
