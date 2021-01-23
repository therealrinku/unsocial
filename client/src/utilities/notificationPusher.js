import firestore from "../firebase/firestore";
import firebase from "firebase/app";

const notificationPusher = (owner_uid) => {
  firestore
    .collection(owner_uid)
    .doc("notifications")
    .update({
      notifications: firebase.firestore.FieldValue.arrayUnion({ new: true }),
    });
};

export default notificationPusher;
