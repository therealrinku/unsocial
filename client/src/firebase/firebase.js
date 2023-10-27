import firebase from "firebase/app";
import "firebase/storage";

// this config is outdated, i have updated  it in my local setup 😌
const firebaseConfig = {
  apiKey: "AIzaSyCULMQk_Nv61qdPACYDnIXTp0AYfXpV7hw",
  authDomain: "uns0cial.firebaseapp.com",
  projectId: "uns0cial",
  storageBucket: "uns0cial.appspot.com",
  messagingSenderId: "1020518259432",
  appId: "1:1020518259432:web:25f223578523f02447c75d",
  measurementId: "G-3Z3PTVYVDD",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
