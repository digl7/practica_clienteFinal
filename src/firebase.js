  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB76ns64HpI1Pgk3Nie8vbu9RrcbY6prdg",
    authDomain: "prueba-627ce.firebaseapp.com",
    projectId: "prueba-627ce",
    storageBucket: "prueba-627ce.appspot.com",
    messagingSenderId: "487264351705",
    appId: "1:487264351705:web:e052f3e68bfdd8dee6d5c8",
    measurementId: "G-81QV1TCS2Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()

  export {db,auth}