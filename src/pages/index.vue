<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div>
        <h1 class="title">test app</h1>
        <div v-if="projects.length != 0">
          <ul>
            <li v-for="project in projects" :key="project.id">
              {{ project.name }}
            </li>
          </ul>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import firestore from '~/plugins/firebase'
export default {
  async asyncData({ params }) {
    return {
      projects: await getAllDocs('users'),
    }
  },
}
// get all documents
async function getAllDocs(collection) {
  const obj = []
  const colRef = firestore.collection(collection)
  const allSnapShot = await colRef.get()
  allSnapShot.forEach((doc) => {
    obj.push(doc.data())
  })
  return obj
}
</script>
