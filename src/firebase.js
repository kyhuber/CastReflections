// Import Firebase core and services
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase configuration object from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBCRAfGbNYpGywcl-AFjMDCpnPQ4m3gim0",
  authDomain: "castreflections.firebaseapp.com",
  projectId: "castreflections",
  storageBucket: "castreflections.appspot.com",
  messagingSenderId: "1046159238451",
  appId: "1:1046159238451:web:c371cab60045d34c608a46"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase auth and Firestore database
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
