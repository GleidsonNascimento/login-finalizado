import { initializeApp } from "firebase/app";
import { getAuth, signOut } from 'firebase/auth'
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDRTAAZ53FRfyubJ-ZWA7P4e9m6fZXny0g",
    authDomain: "login-585b4.firebaseapp.com",
    projectId: "login-585b4",
    storageBucket: "login-585b4.appspot.com",
    messagingSenderId: "342964281609",
    appId: "1:342964281609:web:93c0225208c3eed80e33d8",
    measurementId: "G-6TCYWYFGKR"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
export const imagemDb = getStorage(app)
export{ signOut}