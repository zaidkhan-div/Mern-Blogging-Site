// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "mern-blog-31868.firebaseapp.com",
    projectId: "mern-blog-31868",
    storageBucket: "mern-blog-31868.firebasestorage.app",
    messagingSenderId: "721850621452",
    appId: "1:721850621452:web:d09c7ac6ab195e67591829",
    measurementId: "G-WXX98C7RD6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);