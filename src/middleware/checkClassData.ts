import { Middleware } from '@nuxt/types'
import { vxm } from '@/store'

const checkClassData: Middleware = ({ redirect, localePath }) => {
  if (!vxm.classData.isLoaded) {
    return redirect(localePath('/'))
  }
}

export default checkClassData
