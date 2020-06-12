import { createModule, mutation } from 'vuex-class-component'
import dayjs from 'dayjs'

const VuexModule = createModule({
  namespaced: 'app',
  strict: false,
  target: 'nuxt'
})

type DisplayDate = Date

interface App {
  displayDate: DisplayDate
}

export class AppStore extends VuexModule implements App {
  displayDate: DisplayDate = new Date()

  @mutation
  public goNextDate() {
    this.displayDate = dayjs(this.displayDate)
      .add(1, 'd')
      .toDate()
  }

  @mutation
  public goPreviousDate() {
    this.displayDate = dayjs(this.displayDate)
      .subtract(1, 'd')
      .toDate()
  }

  @mutation
  public setDate(date: Date) {
    this.displayDate = date
  }
}
