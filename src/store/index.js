import { getUserFromCookie } from '@/helpers'
import firebase from '@/plugins/firebase'
export const actions = {
  async nuxtServerInit({ dispatch, commit, state }, { req, res, error }) {
    const user = getUserFromCookie(req)
    const classDataSnapshot = await firebase
      .firestore()
      .collection('classData')
      .doc('あけしめたす')
      .get()
    const classData = classDataSnapshot.data()
    await dispatch('modules/class/setClassData', { classData })
    if (user) {
      await dispatch('modules/user/setUser', {
        name: user.name,
        email: user.email,
        avatar: user.picture,
        uid: user.user_id,
      })
    }
  },
}
