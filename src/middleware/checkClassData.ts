import { Middleware } from '@nuxt/types'
import { vxm } from '@/store'

const checkClassData: Middleware = ({ redirect }) => {
  if (!vxm.classData.isLoaded) {
    return redirect('/')
  }
}

export default checkClassData
