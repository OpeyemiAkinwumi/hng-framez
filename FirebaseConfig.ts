// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// @ts-ignore: getReactNativePersistence exists in the RN bundle
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// import { ReactNativeAsyncStorage } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdKTEX-76Z8R2icTi0sta_NixJL-nmddg",
  authDomain: "framez-20491.firebaseapp.com",
  projectId: "framez-20491",
  storageBucket: "framez-20491.firebasestorage.app",
  messagingSenderId: "1084072834833",
  appId: "1:1084072834833:web:d8926ad077bf788ca0beb0",
  measurementId: "G-91LPYQJNED",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const analytics = getAnalytics(app);
