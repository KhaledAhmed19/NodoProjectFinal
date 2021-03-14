import firebase from 'firebase/app'
import "firebase/auth"


var firebaseConfig = {
    apiKey: "AIzaSyBV4RVpXSGcwi9Ee8oTCqR7G4TakC4WmQ0",
    authDomain: "authentication-19e8a.firebaseapp.com",
    projectId: "authentication-19e8a",
    storageBucket: "authentication-19e8a.appspot.com",
    messagingSenderId: "989101217812",
    appId: "1:989101217812:web:2d34b80bceafbeb4812f01"
  };
  // Initialize Firebase
 const firebaseApp =  firebase.initializeApp(firebaseConfig);

 export const auth = firebaseApp.auth() 
 export default firebaseApp;