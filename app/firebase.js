// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZvA7mhqAkHOHNeoDT4cbd_RDCYrmrSXM",
  authDomain: "grocery-list-91361.firebaseapp.com",
  projectId: "grocery-list-91361",
  storageBucket: "grocery-list-91361.appspot.com",
  messagingSenderId: "483082513717",
  appId: "1:483082513717:web:8713fede120fc22da3b07c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);