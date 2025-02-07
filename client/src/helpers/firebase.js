import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEnv('VITE_FIREBASE_API'),
    authDomain: "first-mern-blog-c1817.firebaseapp.com",
    projectId: "first-mern-blog-c1817",
    storageBucket: "first-mern-blog-c1817.firebasestorage.app",
    messagingSenderId: "1018221888024",
    appId: "1:1018221888024:web:43d4800be77a10b07c396d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider= new GoogleAuthProvider()

export {auth, provider}