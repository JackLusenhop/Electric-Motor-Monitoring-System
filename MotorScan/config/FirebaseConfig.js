// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD1Tq6ihQD7Gj-zt99InaOXYm1VgeqUhZc",
	authDomain: "motorscan-4eec6.firebaseapp.com",
	projectId: "motorscan-4eec6",
	storageBucket: "motorscan-4eec6.appspot.com",
	messagingSenderId: "438562496838",
	appId: "1:438562496838:web:2f21c0af235674abc50547",
	measurementId: "G-461EN2W8FM"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
	persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
