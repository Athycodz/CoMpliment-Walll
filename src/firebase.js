// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoxDDPtBdf_uWOmmd_Z_rQmCvKHh6E4Ec",
  authDomain: "compliment-wall-9dea2.firebaseapp.com",
  projectId: "compliment-wall-9dea2",
  storageBucket: "compliment-wall-9dea2.firebasestorage.app",
  messagingSenderId: "5924684213",
  appId: "1:5924684213:web:dbf68174130d82110b19fc",
  measurementId: "G-KXXEGDFSWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);