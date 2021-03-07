  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBR2zHU6Cvv3Vuu3_gyC5LbZnyTKrQFLHg",
    authDomain: "react-cliente-dwec-diego.firebaseapp.com",
    projectId: "react-cliente-dwec-diego",
    storageBucket: "react-cliente-dwec-diego.appspot.com",
    messagingSenderId: "324082912159",
    appId: "1:324082912159:web:fb7efc98bbee4fcaf98baa",
    measurementId: "G-4NNL87TW4Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const googleProvider = new firebase.auth.GoogleAuthProvider()


  export {db,auth, googleProvider}