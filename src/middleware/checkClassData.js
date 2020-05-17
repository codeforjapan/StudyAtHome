export default function({ store, redirect }) {
  if (!store.getters['class/isLoaded']) {
    return redirect('/')
  }
}
