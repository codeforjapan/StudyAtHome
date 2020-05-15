// @ts-ignore
import { getUserFromCookie } from '@/helpers/index.js'
export const actions = {
  // @ts-ignore
  nuxtServerInit: ({ commit }, { req }) => {
    const user = getUserFromCookie(req)
    if (user) {
      commit('modules/user/setUserData', {
        name: user.name,
        email: user.email,
        avatar: user.picture,
        uid: user.user_id
      })
    }
  }
}
