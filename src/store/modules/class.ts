import {
  VuexModule,
  Module,
  action,
  getter,
  mutation
} from 'vuex-class-component'
import dayjs from 'dayjs'
import firebase from 'firebase'

interface ClassDataState {
  classId: string
  classData: Class
  viewDate: string
}

interface Class {
  schoolName: string
  className: string
  Lessons: StudyData[]
}

interface StudyData {
  Content: string
  Subject: string
  realTime: string
}

@Module({ namespacedPath: 'modules/class/', target: 'nuxt' })
class ClassData extends VuexModule implements ClassDataState {
  @getter classId: string = ''
  @getter classData: Class = {
    schoolName: '',
    className: '',
    Lessons: []
  }

  @getter viewDate: string = ''
  @getter schoolName: string = this.classData.schoolName
  @getter className: string = this.classData.className
  @getter Lessons: StudyData[] = this.classData.Lessons
  @getter isLoadedClassData: Boolean = !this.schoolName && !this.className
  @mutation
  public setClassData(classData: Class) {
    this.classData = classData
  }

  @mutation
  public setClassId(classId: string) {
    this.classId = classId
  }

  @mutation
  public setViewDate(viewDate: string) {
    this.viewDate = viewDate
  }

  @mutation
  public nextDate() {
    this.setViewDate(
      dayjs(this.viewDate)
        .add(1, 'd')
        .format('YYYY-MM-DD')
    )
  }

  @mutation
  public prevDate() {
    this.setViewDate(
      dayjs(this.viewDate)
        .subtract(1, 'd')
        .format('YYYY-MM-DD')
    )
  }

  @action()
  public async loadClassData(classId: string) {
    const classDataSnapshot = await firebase
      .firestore()
      .collection('classData')
      .doc(classId)
      .get()
    const classDa = (await classDataSnapshot.data()) as Class
    await this.setClassData(classDa)
    await this.setClassId(classId)
  }
}

export default ClassData.ExtractVuexModule(ClassData)
