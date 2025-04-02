import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserLocalPersistence,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDNFeCdF1UUBCZxoRKMSwBJRBHeQqkXza0",
  authDomain: "threadscity-b9385.firebaseapp.com",
  databaseURL: "https://threadscity-b9385-default-rtdb.firebaseio.com",
  projectId: "threadscity-b9385",
  storageBucket: "threadscity-b9385.appspot.com",
  messagingSenderId: "178517372667",
  appId: "1:178517372667:web:28376b82273da0bc484a5e",
  measurementId: "G-M2YPGQQS81"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const database = getDatabase(app);

export { auth, googleProvider, facebookProvider, database };