  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB5ENKS29_bU1gwY0USQc_ylYiCwbwbiY8",
    authDomain: "react-pelis.firebaseapp.com",
    projectId: "react-pelis",
    storageBucket: "react-pelis.appspot.com",
    messagingSenderId: "45017490130",
    appId: "1:45017490130:web:5c89cbaf6584b8cc5cc30b",
    measurementId: "G-17CDWM8459"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const googleProvider = new firebase.auth.GoogleAuthProvider()


  export {db,auth, googleProvider}