import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCULMQk_Nv61qdPACYDnIXTp0AYfXpV7hw",
  authDomain: "uns0cial.firebaseapp.com",
  projectId: "uns0cial",
  storageBucket: "uns0cial.appspot.com",
  messagingSenderId: "1020518259432",
  appId: "1:1020518259432:web:6eb0e9a030b9cfb047c75d",
  measurementId: "G-QHLCGJL01L"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
