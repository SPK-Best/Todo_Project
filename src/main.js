import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from "firebase";
import 'firebase/firestore';
import {firestorePlugin} from 'vuefire';

Vue.use(firestorePlugin);

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpOOdD3h2uZIAosVSX7hACff9PVWhfWus",
  authDomain: "todo-project-5e24e.firebaseapp.com",
  databaseURL: "https://todo-project-5e24e-default-rtdb.firebaseio.com",
  projectId: "todo-project-5e24e",
  storageBucket: "todo-project-5e24e.appspot.com",
  messagingSenderId: "891673314028",
  appId: "1:891673314028:web:e40e87a0e8ce68c8609bc9"
};
// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
