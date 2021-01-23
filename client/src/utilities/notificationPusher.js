import firestore from "../firebase/firestore";

const notificationPusher = (owner_uid) => {
  firestore
    .collection(owner_uid)
    .doc("notifications")
    .set(
      {
        [`next${new Date() * Math.random()}`]: "text",
      },
      { merge: true }
    );
};

export default notificationPusher;
