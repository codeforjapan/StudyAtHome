import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { Context } from '@nuxt/types/app'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import { getUserFromCookie } from '@/helpers/index.js'
import { UserStore } from '@/store/modules/user'
import { ClassDataStore } from '@/store/modules/classData'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
    ...extractVuexModule(ClassDataStore)
  }
})

export const actions = {
  nuxtServerInit(_ctx: ActionContext<any, any>, { req }: Context) {
    const user = getUserFromCookie(req)
    if (user) {
      vxm.user.userData = {
        name: user.name,
        email: user.email,
        avatar: user.picture,
        uid: user.user_id
      }
    }
  }
}

export const vxm = {
  user: createProxy(store, UserStore),
  classData: createProxy(store, ClassDataStore)
}
