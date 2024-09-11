// Import only the functions you need from the Firebase SDK
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore

// Export the initialized services
export { auth, db, app };
