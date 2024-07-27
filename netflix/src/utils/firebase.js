// Import the functions you need from the SDKs you need


import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbS7jWYsoFKGu_5qe4NDYOQTArji_UJBY",
  authDomain: "netflixgpt125.firebaseapp.com",
  projectId: "netflixgpt125",
  storageBucket: "netflixgpt125.appspot.com",
  messagingSenderId: "426969912622",
  appId: "1:426969912622:web:7eed2035f871155cc3d6bf",
  measurementId: "G-V7TR96HP23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export const auth = getAuth();
