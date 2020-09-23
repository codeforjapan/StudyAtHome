import {
  action,
  createModule,
  createProxy,
  mutation,
} from 'vuex-class-component'
import { AppStore } from '@/store/modules/app'
import classData from '@/types/store/classData'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { getClass } from '@/graphql/queries'
import { createClass, createLesson, updateLesson } from '@/graphql/mutations'
import { GetClassQuery } from '@/API'
import { vxm } from '@/store'

const VuexModule = createModule({
  namespaced: 'classData',
  strict: false,
  target: 'nuxt',
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

    return this.lessons.filter((lesson) => {
      const startOfLesson = new Date(lesson.startTime).getTime()
      return start <= startOfLesson && end >= startOfLesson
    })
  }

  public get isLoaded(): boolean {
    return !!this.className
  }

  @action
  public async loadClassData(classId: classData.ClassId) {
    const result = (await API.graphql(
      graphqlOperation(getClass, { id: classId })
    )) as GraphQLResult<GetClassQuery>

    const classObject = result?.data?.getClass
    if (!classObject) {
      throw new Error('クラスIDが間違っています')
    }

    const className = classObject.className

    const classLessonsItems = result.data?.getClass?.lessons?.items as any[]

    this.setClassData({
      classId,
      className,
      lessons: classLessonsItems,
    })
  }

  @action
  public async registerClass({
    className,
    schoolName,
  }: {
    className: string
    schoolName: string
  }) {
    if (!vxm.user.isAuthenticated) {
      throw new Error('ユーザーが正しくログインされていません')
    }

    let classId, classObject
    do {
      classId = generateUniqueId()
      try {
        const result = (await API.graphql(
          graphqlOperation(getClass, {
            id: classId,
          })
        )) as GraphQLResult<GetClassQuery>
        classObject = result?.data?.getClass
      } catch {
        throw new Error('エラーによって処理に失敗しました')
      }
    } while (classObject)

    try {
      const user = await Auth.currentAuthenticatedUser()
      await API.graphql(
        graphqlOperation(createClass, {
          input: {
            id: classId,
            className,
            schoolName,
            owner: user.username,
          },
        })
      )
    } catch {
      throw new Error('エラーによって処理に失敗しました')
    }
    this.setClassData({
      classId,
      className,
      lessons: [],
    })
  }

  @action
  public async registerLesson(lessonData: classData.Lesson) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await API.graphql(
        graphqlOperation(createLesson, {
          input: {
            classId: this.classId,
            owner: user.username,
            ...lessonData,
          },
        })
      )
    } catch {
      throw new Error('エラーによって処理に失敗しました')
    }
    await this.loadClassData(this.classId)
  }

  @action
  public async changeLesson({
    editData,
    id,
  }: {
    editData: any
    id: classData.LessonId
  }) {
    try {
      await API.graphql(
        graphqlOperation(updateLesson, {
          input: {
            id,
            ...editData,
          },
        })
      )
    } catch {
      throw new Error('エラーによって処理に失敗しました')
    }
    await this.loadClassData(this.classId)
  }

  @mutation
  public setClassData({ classId, className, lessons }: classData.ClassData) {
    this.classId = classId
    this.className = className
    this.lessons = lessons
  }

  @action
  public async unloadClassData() {
    this.setClassData({
      classId: '',
      className: '',
      lessons: [],
    })
  }
}
