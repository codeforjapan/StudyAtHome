import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import firebase from '@/plugins/firebase'
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
  nuxtServerInit(_ctx: ActionContext<any, any>) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        vxm.user.login()
      }
    })
  }
}

export const vxm = {
  user: createProxy(store, UserStore),
  classData: createProxy(store, ClassDataStore)
}
