import Vue from 'vue'
import Vuex from 'vuex'
// import Vuex, { ActionContext } from 'vuex'
// import { Context } from '@nuxt/types/app'
import { createProxy, extractVuexModule } from 'vuex-class-component'
// import jwtDecode from 'jwt-decode'
import { AppStore } from '@/store/modules/app'
import { ClassDataStore } from '@/store/modules/classData'
import { UserStore } from '@/store/modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(AppStore),
    ...extractVuexModule(ClassDataStore),
    ...extractVuexModule(UserStore),
  },
})
/*
export const actions = {
  async nuxtServerInit(_ctx: ActionContext<any, any>, { req }: Context) {
    const authorizationHeader = req.headers.authorization || ''
    const components = authorizationHeader.split(' ')
    const token = components.length > 1 ? components[1] : ''
    if (!token) return
    const decodedClaims = await jwtDecode(token)
    if (decodedClaims) {
      await vxm.user.loginFromUserObject(decodedClaims)
    }
  }
}
*/

export const vxm = {
  app: createProxy(store, AppStore),
  classData: createProxy(store, ClassDataStore),
  user: createProxy(store, UserStore),
}
