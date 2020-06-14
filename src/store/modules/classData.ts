import {
  action,
  createModule,
  createProxy,
  mutation
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
  schoolName: string = ''
  lessons: classData.LessonWithId[] = []

  public get lessonsOnCurrentDate(): classData.LessonWithId[] {
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

  @action
  public async loadClassData({
    classId,
    isEditor
  }: {
    classId: classData.ClassId
    isEditor: boolean
  }) {
    const lessons: classData.LessonWithId[] = []
    console.log(classId)
    const classDataDocument = firebase
      .firestore()
      .collection('classData')
      .doc(classId)

    // classData ドキュメントのフィールドを取得
    const classDataSnapshot = await classDataDocument.get()
    console.log(classDataSnapshot)
    if (!classDataSnapshot.exists)
      throw new Error('クラスIDが間違っています: 0001')
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
        const converted: classData.LessonWithId = {
          docId: doc.id,
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
      throw new Error('クラスIDが間違っています0002')
    }
    if (isEditor) {
      const editorClassDataDocument = firebase
        .firestore()
        .collection('editorClassData')
        .doc(classId)

      // classData ドキュメントのフィールドを取得
      const editorClassDataSnapshot = await editorClassDataDocument.get()

      if (!editorClassDataSnapshot.exists)
        throw new Error('クラスIDが間違っています:0003')
      const schoolName = editorClassDataSnapshot.get('schoolName')

      this.setClassData({
        classId,
        schoolName,
        className,
        lessons
      })
    }
    this.setClassData({
      classId,
      schoolName: '',
      className,
      lessons
    })
  }

  @action
  public async registerClass(classData: classData.ClassData) {
    console.log(classData)
    this.setClassData(classData)
  }

  @action
  public async registerLesson(lessonData: classData.Lesson) {
    await firebase
      .firestore()
      .collection('classData')
      .doc(this.classId)
      .collection('Lessons')
      .add(lessonData)
      .catch(() => {
        return Promise.reject(new Error('エラーによって処理に失敗しました'))
      })
    console.log(this.classId)
    this.loadClassData({ classId: this.classId, isEditor: true })
  }

  @action
  public async changeLesson({
    editData,
    id
  }: {
    editData: classData.Lesson
    id: classData.LessonId
  }) {
    await firebase
      .firestore()
      .collection('classData')
      .doc(this.classId)
      .collection('Lessons')
      .doc(id)
      .set(editData)
      .catch(() => {
        return Promise.reject(new Error('エラーによって処理に失敗しました'))
      })
    this.loadClassData({ classId: this.classId, isEditor: true })
  }

  @mutation
  private setClassData({
    classId,
    schoolName,
    className,
    lessons
  }: classData.ClassData) {
    this.classId = classId
    this.schoolName = schoolName
    this.className = className
    this.lessons = lessons
  }
}
