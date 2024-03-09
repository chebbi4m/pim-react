// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyBqjJ8cLUIWgo_bJJYpBozDLCI7Rh-kLQw",
    authDomain: "pim2024-f39ff.firebaseapp.com",
    projectId: "pim2024-f39ff",
    storageBucket: "pim2024-f39ff.appspot.com",
    messagingSenderId: "840022491060",
    appId: "1:840022491060:web:28df356450ece67fabbce1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb= getStorage(app)