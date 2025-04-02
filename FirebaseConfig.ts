import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  connectAuthEmulator,
  getReactNativePersistence,
  getAuth
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
// if(initializeApp(firebaseConfig) !== null){
//   const app = initializeApp(firebaseConfig);
//   const auth = initializeAuth(app, {
//        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//    })
// }

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const database = getDatabase(app);

connectAuthEmulator(auth, "http://localhost:9099", {
  disableWarnings: true
});
// if (__DEV__) {
//   try {
   
//   } catch (error) {
//     console.log("Emulator đã được kết nối trước đó hoặc có lỗi:", error);
//   }
// }

export { auth, googleProvider, facebookProvider, database };