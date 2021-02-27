import firebase from "./firebase";
import "firebase/firestore";

const firestore = firebase.firestore();

/*layout of firebase.js file which is deleted for security reasons.
import firebase from "firebase/app";
import "firebase/storage";

const config = {
  config here
};

firebase.initializeApp(config);

export default firebase;
*/

export default firestore;
