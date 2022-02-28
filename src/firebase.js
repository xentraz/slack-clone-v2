// Back-end connections
// import firebase from 'firebase/compat/app';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDaYuP9rm4sv8ZifNxXPAO0JyBjzdnIw5U",
  authDomain: "slack-clone-2da23.firebaseapp.com",
  projectId: "slack-clone-2da23",
  storageBucket: "slack-clone-2da23.appspot.com",
  messagingSenderId: "961037750628",
  appId: "1:961037750628:web:c0b3fd3333640648242a71",
  measurementId: "G-RVFXZVELN5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// Connect to firebase app 
const db = firebaseApp.firestore();
// Connect to firebase database
const auth = firebase.auth();
// Connect to firebase authentication
const provider = new firebase.auth.GoogleAuthProvider();
// Google authentication provider

export { auth, provider };
// Export auth and provider for use in (one) other file
export default db;
// Export db for use in other other files