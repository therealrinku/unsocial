import { useState } from "react";
import { connect } from "react-redux";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";
import {
  updateUserData,
  updateProfilePicture,
  updatePassword,
} from "../services/userServices";
import storage from "../firebase/storage";
import Compressor from "compressorjs";

const EditProfilePage = ({
  currentUserProfileImage,
  currentUserName,
  currentUserUid,
  currentUserBio,
  currentUserEmail,
}) => {
  const [username, setUsername] = useState(currentUserName);
  const [email, setEmail] = useState(currentUserEmail);
  const [bio, setBio] = useState(currentUserBio);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updatingProfilePicture, setUpdatingProfilePicture] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  //password
  const [initialPassword, setInitialPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  //image file
  const [selectedImage, setSelectedImage] = useState(null);
  const newImage = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const updateImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const updateProfilePictureFinal = () => {
    if (selectedImage && !updatingProfilePicture) {
      setUpdatingProfilePicture(true);
      new Compressor(selectedImage, {
        quality: 0.6,
        success(result) {
          const uploadedImage = storage
            .ref(`/profilePics/${currentUserUid}/${result.name}`)
            .put(result);
          uploadedImage.on(
            "state_changed",
            (snapshot) => {},
            (err) => console.log(err),
            () => {
              storage
                .ref(`/profilePics/${currentUserUid}`)
                .child(result.name)
                .getDownloadURL()
                .then((url) => {
                  updateProfilePicture(currentUserUid, url)
                    .then((res) => {
                      if (res === "done") {
                        setSuccessMsg(
                          "Profile image updated...page will reload in 3 seconds."
                        );
                        setTimeout(() => {
                          window.location.reload();
                        }, 3000);
                      } else {
                        setError(res);
                      }
                    })
                    .catch((err) => setError(err.message));
                });
            }
          );
        },
      });
    }
  };

  const updatePasswordFinal = () => {
    setUpdating(true);
    if (newPassword1 === newPassword2) {
      if (newPassword1.trim().length >= 5 && newPassword1.trim().length <= 25) {
        updatePassword(currentUserUid, initialPassword, newPassword1).then(
          (res) => {
            setUpdating(false);
            if (res === "success") {
              setSuccessMsg("Successfully changed password");
            } else {
              setError(res);
            }
          }
        );
      }
    } else {
      setError("Passwords must match.");
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();
    setUpdating(true);

    if (
      username === currentUserName &&
      email === currentUserEmail &&
      bio === currentUserBio
    ) {
      setError("Nothing to Update.");
      setUpdating(false);
    } else {
      if (
        !username.trim().includes(" ") &&
        username.trim().length >= 5 &&
        username.trim().length <= 25
      ) {
        updateUserData(
          username.trim(),
          email || "",
          bio || "",
          currentUserName
        ).then((res) => {
          if (res !== "success") {
            setUpdating(false);
            setError(res);
          } else {
            setSuccessMsg("Profile updated...page will reload in 3 seconds.");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        });
      } else {
        setUpdating(false);
        setError("Username must be spaceless between 5 and 25 characters.");
      }
    }

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <div className="edit--profile-page">
      <Navbar />
      <MobileNavbar />

      <section className="section-one">
        <img src={newImage || currentUserProfileImage} alt="profile-image" />

        <div>
          <p>{currentUserName}</p>
          <label htmlFor="image" style={newImage ? { display: "none" } : null}>
            Change Profile Photo
          </label>
          <label htmlFor="u-btn" style={!newImage ? { display: "none" } : null}>
            {updatingProfilePicture
              ? "Updating Profile Picture.."
              : "Confirm New Profile Photo"}
          </label>
          <button
            style={{ display: "none" }}
            id="u-btn"
            onClick={updateProfilePictureFinal}
          >
            Update Profile Photo
          </button>
          <input
            type="file"
            style={{ display: "none" }}
            id="image"
            onChange={updateImage}
          />
        </div>
      </section>

      <section>
        {updatingPassword ? (
          <form>
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
          </form>
        ) : (
          <form onSubmit={updateProfile}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="Bio">Bio</label>
            <textarea type="text" onChange={(e) => setBio(e.target.value)}>
              {bio}
            </textarea>
          </form>
        )}

        <div className="btns">
          <section>
            <p>{error}</p>
            <p style={{ color: "green" }}>{successMsg}</p>
            <button
              disabled={updating}
              className="submit-btn"
              onClick={updatingPassword ? updatePasswordFinal : updateProfile}
            >
              Submit
            </button>
          </section>
          <button
            className="toggle-btn"
            onClick={() => setUpdatingPassword((prev) => !prev)}
          >
            {updatingPassword ? "Update Profile" : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserEmail: state.user.currentUserData.email,
    currentUserBio: state.user.currentUserData.bio,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
    currentUserName: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(EditProfilePage);
