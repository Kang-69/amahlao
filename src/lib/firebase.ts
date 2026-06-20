// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0nghM9NX7BZ5skgp8qDgNt3poBM9ceT0",
  authDomain: "amahlao.firebaseapp.com",
  projectId: "amahlao",
  storageBucket: "amahlao.firebasestorage.app",
  messagingSenderId: "587031689924",
  appId: "1:587031689924:web:ed5eb1a2d88189b06ce791",
  measurementId: "G-HJ5DYWRT55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
