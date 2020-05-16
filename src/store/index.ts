import { getUserFromCookie } from '@/helpers/index.js'
export const actions = {
  // TODO anyから直す
  nuxtServerInit: ({ commit }: any, { req }: any) => {
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
