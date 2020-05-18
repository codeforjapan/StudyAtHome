import { vxm } from '@/store'

export default function({ redirect }) {
  if (!vxm.classData.isLoaded) {
    return redirect('/')
  }
}
