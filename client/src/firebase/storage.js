import firebase from "firebase/app";
import "firebase/storage";
import config from "./config";

firebase.initializeApp(config);

const storage = firebase.storage();
export default storage;
