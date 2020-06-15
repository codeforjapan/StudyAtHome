import {
  action,
  createModule,
  createProxy,
  mutation
} from 'vuex-class-component'
import firebase from '@/plugins/firebase'
import { AppStore } from '@/store/modules/app'
import { classData } from '@/types/store/classData'
import { vxm } from '~/store'

const VuexModule = createModule({
  namespaced: 'classData',
  strict: false,
  target: 'nuxt'
})

const generateUniqueId = (): string => {
  const c =
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
  const cl = c.length
  const result =
    c[Math.floor(Math.random() * cl)] +
    c[Math.floor(Math.random() * cl)] +
    c[Math.floor(Math.random() * cl)] +
    c[Math.floor(Math.random() * cl)] +
    c[Math.floor(Math.random() * cl)] +
    c[Math.floor(Math.random() * cl)]
  return result + ''
}

export class ClassDataStore extends VuexModule implements classData.ClassData {
  classId: classData.ClassId = ''
  className: string = ''
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
  public async loadClassData(classId: classData.ClassId) {
    const lessons: classData.LessonWithId[] = []
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
      throw new Error('クラスIDが間違っています')
    }
    this.setClassData({
      classId,
      className,
      lessons
    })
  }

  @action
  public async registerClass({
    className,
    schoolName
  }: {
    className: string
    schoolName: string
  }) {
    let classId = generateUniqueId()
    if (!vxm.user.isAuthenticated) {
      throw new Error('ユーザーが正しくログインされていません')
    }
    try {
      const doc = await firebase
        .firestore()
        .collection('classData')
        .doc(classId)
        .get()
      if (doc.exists) {
        classId = generateUniqueId()
      }
    } catch {
      throw new Error('エラーによって処理に失敗しました')
    }
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(vxm.user.uid)
        .update({
          allow_access: firebase.firestore.FieldValue.arrayUnion(classId)
        })
      await firebase
        .firestore()
        .collection('editorClassData')
        .doc(classId)
        .set({
          schoolName
        })
      await firebase
        .firestore()
        .collection('classData')
        .doc(classId)
        .set({
          lesson: [],
          className
        })
    } catch {
      throw new Error('エラーによって処理に失敗しました')
    }
    this.setClassData({
      classId,
      className,
      lessons: []
    })
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
    this.loadClassData(this.classId)
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
    this.loadClassData(this.classId)
  }

  @mutation
  private setClassData({ classId, className, lessons }: classData.ClassData) {
    this.classId = classId
    this.className = className
    this.lessons = lessons
  }

  @action
  public async unloadClassData() {
    this.setClassData({
      classId: '',
      className: '',
      lessons: []
    })
  }
}
