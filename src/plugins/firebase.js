import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDryyjdTrz5FWFveRwjiRqmUaE6yje2vas',
  authDomain: 'studyathome.firebaseapp.com',
  databaseURL: 'https://studyathome.firebaseio.com',
  projectId: 'studyathome',
  storageBucket: 'studyathome.appspot.com',
  messagingSenderId: '133064394534',
  appId: '1:133064394534:web:9198f1bf636a12535e63e7',
  measurementId: 'G-N9EMMWHQJV',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
