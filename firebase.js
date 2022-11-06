// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCWeGdrX_781HeA1v7OSVqLHbjRtvwMyo",
  authDomain: "sp-12-login-authentication.firebaseapp.com",
  projectId: "sp-12-login-authentication",
  storageBucket: "sp-12-login-authentication.appspot.com",
  messagingSenderId: "759349754989",
  appId: "1:759349754989:web:1fb54dfd91449dce155364",
  measurementId: "G-HKWCVP7WGY"
};

// Initialize Firebase
let app;
if(firebase.apps.length == 0) { // if the app has not been initialized
    app = firebase.initializeApp(firebaseConfig);
} else { // if the app HAS been initialized
    app = firebase.app();
}

const auth = firebase.auth();
const analytics = getAnalytics(app);

export { auth };