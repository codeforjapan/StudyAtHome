import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { Context } from '@nuxt/types/app'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import jwtDecode from 'jwt-decode'
import { AppStore } from '@/store/modules/app'
import { UserStore } from '@/store/modules/user'
import { ClassDataStore } from '@/store/modules/classData'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(AppStore),
    ...extractVuexModule(UserStore),
    ...extractVuexModule(ClassDataStore)
  }
})

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

export const vxm = {
  app: createProxy(store, AppStore),
  user: createProxy(store, UserStore),
  classData: createProxy(store, ClassDataStore)
}
