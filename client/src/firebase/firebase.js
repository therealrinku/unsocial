import firebase from "firebase/app";
import config from "../firebaseConfig";
import "firebase/storage";

firebase.initializeApp(config);

export default firebase;
