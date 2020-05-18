import { vxm } from '@/store'

export default function({ redirect }) {
  if (!vxm.class.isLoaded) {
    return redirect('/')
  }
}
