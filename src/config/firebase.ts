

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCHGKXw05cLDKQ8kxW7tzBwEtDpkGfwvY4",
    authDomain: "login-a3126.firebaseapp.com",
    projectId: "login-a3126",
    storageBucket: "login-a3126.appspot.com",
    messagingSenderId: "457951699062",
    appId: "1:457951699062:web:4bdc20e9943a4297467f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);