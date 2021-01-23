import firestore from "../firebase/firestore";

const clearNotification = (owner_uid) => {
  firestore.collection(owner_uid).doc("notifications").delete();
};

export default clearNotification;
