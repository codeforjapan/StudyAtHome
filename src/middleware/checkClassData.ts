import { Middleware } from '@nuxt/types'
const checkClassData: Middleware = ({ store, redirect }) => {
  if (!store.getters['modules/class/isLoadedClassData']) {
    return redirect('/')
  }
}

export default checkClassData
