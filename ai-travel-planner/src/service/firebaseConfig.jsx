// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLFYteNNXSLh8r4yJXmvljAdW__zUVh-g",
  authDomain: "ai-travel-planner-427418.firebaseapp.com",
  projectId: "ai-travel-planner-427418",
  storageBucket: "ai-travel-planner-427418.appspot.com",
  messagingSenderId: "710161050205",
  appId: "1:710161050205:web:679d18cf49fddce6eafbb4",
  measurementId: "G-3FF8SD5CGP"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
// const analytics = getAnalytics(app);