import { createModule, mutation } from 'vuex-class-component'

const VuexModule = createModule({
  namespaced: 'app',
  strict: false,
  target: 'nuxt',
})

type CurrentDate = Date

interface App {
  currentDate: CurrentDate
}

export class AppStore extends VuexModule implements App {
  currentDate: CurrentDate = new Date()

  @mutation
  public goNextDate() {
    this.currentDate = this.$store.$dayjs(this.currentDate).add(1, 'd').toDate()
  }

  @mutation
  public goPreviousDate() {
    this.currentDate = this.$store
      .$dayjs(this.currentDate)
      .subtract(1, 'd')
      .toDate()
  }

  @mutation
  public setDate(date: Date) {
    this.currentDate = date
  }

  @mutation
  public resetDate() {
    this.currentDate = new Date()
  }
}
