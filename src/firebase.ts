import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCBEdYaoX8w9-VZSf83pB20B4F3-YU9Buo",
    authDomain: "bicycle-go-c05e4.firebaseapp.com",
    projectId: "bicycle-go-c05e4",
    storageBucket: "bicycle-go-c05e4.firebasestorage.app",
    messagingSenderId: "910723304599",
    appId: "1:910723304599:web:84b67093939d4897856dd2",
    databaseURL: "https://bicycle-go-c05e4-default-rtdb.firebaseio.com"
  };

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)