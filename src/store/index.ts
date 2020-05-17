import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { Context } from '@nuxt/types/app'
import { createProxy, extractVuexModule } from 'vuex-class-component'
import { getUserFromCookie } from '@/helpers/index.js'
import { UserStore } from '@/store/modules/user'
import { ClassStore } from '@/store/modules/class'
/*
import checkExistsClassData from '`@/utils/checkExistsClassData'
import firebase from '@/plugins/firebase'
*/

Vue.use(Vuex)

export async function nuxtServerInit(
  _ctx: ActionContext<any, any>,
  { req }: Context
) {
  const user = getUserFromCookie(req)
  /*
  const classDataSnapshot = await firebase
    .firestore()
    .collection('classData')
    .doc('あけしめたす')
    .get()
  const classData = classDataSnapshot.data()
  await dispatch('modules/class/setClassData', { classData }) */
  if (user) {
    vxm.user.userData = {
      name: user.name,
      email: user.email,
      avatar: user.picture,
      uid: user.user_id
    }
  }
}

const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
    ...extractVuexModule(ClassStore)
  }
})

export const vxm = {
  user: createProxy(store, UserStore),
  class: createProxy(store, ClassStore)
}
