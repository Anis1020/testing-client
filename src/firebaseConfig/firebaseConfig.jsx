// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc7uzFgvn4mfM-uRnV0wlHM3rce64ALr0",
  authDomain: "testing-42394.firebaseapp.com",
  projectId: "testing-42394",
  storageBucket: "testing-42394.appspot.com",
  messagingSenderId: "901592833620",
  appId: "1:901592833620:web:6422e9c3e44ed5301d97c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
