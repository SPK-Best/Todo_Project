import firebase from 'firebase/app';
import store from '@/store/store';
import 'firebase/auth';

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

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.auth().onAuthStateChanged((user) => {
    store.dispatch('userRegister', user);
    store.dispatch('userLogin', user);
});

firebase.getCurrentUser = () => new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
    }, reject);
});

export default firebase;