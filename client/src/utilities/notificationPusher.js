import firestore from "../firebase/firestore";

const notificationPusher = (owner_uid) => {
  firestore
    .collection(owner_uid)
    .doc("notifications")
    .set(
      {
        new: new Date() * Math.random(),
      },
      { merge: true }
    );
};

export default notificationPusher;
