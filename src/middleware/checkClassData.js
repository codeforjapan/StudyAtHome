export default function ({ store, redirect }) {
  if (!store.getters['modules/class/isLoadedClassData']) {
    return redirect('/')
  }
}
