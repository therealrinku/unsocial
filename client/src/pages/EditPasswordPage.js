import { useState } from "react";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";
import { updatePassword } from "../services/userServices";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EditPasswordPage = ({ currentUserUid }) => {
  const [initialPassword, setInitialPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const updatePasswordFinal = (e) => {
    e.preventDefault();
    setUpdating(true);
    if (newPassword1 === newPassword2) {
      if (newPassword1.trim().length >= 5 && newPassword1.trim().length <= 25) {
        updatePassword(currentUserUid, initialPassword, newPassword1).then(
          (res) => {
            setUpdating(false);
            if (res === "success") {
              setError(null);
              setSuccessMsg("Successfully changed password");
              setInitialPassword("");
              setNewPassword1("");
              setNewPassword2("");
            } else {
              setError(res);
            }
          }
        );
      } else {
        setUpdating(false);
        setError("new passwords must be between 5 to 25 characters.");
      }
    } else {
      setUpdating(false);
      setError("new passwords must match.");
    }
  };

  return (
    <div className="edit--password-page">
      <Navbar />
      <MobileNavbar />

      <form onSubmit={updatePasswordFinal}>
        <label htmlFor="password1">Current Password</label>
        <input
          type="password"
          value={initialPassword}
          id="username"
          onChange={(e) => setInitialPassword(e.target.value)}
        />
        <label htmlFor="password2">New Password</label>
        <input
          type="password"
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
        />
        <label htmlFor="password3">Retype New Password</label>
        <input
          type="password"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
        />
        <button disabled={updating} className="submit-btn">
          Submit
        </button>
        <p className="err-p">{error}</p>
        <p
          className="msg-p"
          style={{ color: "green", fontSize: "13px", marginTop: "-10px" }}
        >
          {successMsg}
        </p>
        <Link to="/edit/profile">Update Profile</Link>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(EditPasswordPage);
