// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDoxDDPtBdf_uWOmmd_Z_rQmCvKHh6E4Ec",
  authDomain: "compliment-wall-9dea2.firebaseapp.com",
  projectId: "compliment-wall-9dea2",
  storageBucket: "compliment-wall-9dea2.firebasestorage.app",
  messagingSenderId: "5924684213",
  appId: "1:5924684213:web:dbf68174130d82110b19fc",
  measurementId: "G-KXXEGDFSWD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth state listener for debugging
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('🔐 Auth State: User logged in -', user.email, 'UID:', user.uid);
  } else {
    console.log('🔓 Auth State: No user logged in');
  }
});

console.log('🔥 FIREBASE.JS FILE LOADED');
console.log('🔥 Auth object:', auth);
console.log('🔥 DB object:', db);