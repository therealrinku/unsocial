import { FormEvent, useState } from "react";
import { connect } from "react-redux";
import { updateUserData, updateProfilePicture, updatePassword } from "../../services/userServices";
import storage from "../../firebase/storage";
import Compressor from "compressorjs";
import { Link } from "react-router-dom";
import * as postActions from "../../redux/post/postsActions";
import * as userActions from "../../redux/user/userActions";
import styles from "./SettingsPage.module.scss";

type SettingsPageTypes = {
  currentUserProfileImage: string;
  currentUserName: string;
  currentUserUid: string;
  currentUserBio: string;
  currentUserEmail: string;
  ADD_MESSAGE: Function;
  UPDATE_PROFILE_LOCALLY: Function;
};

const SettingsPage = ({
  currentUserProfileImage,
  currentUserName,
  currentUserUid,
  currentUserBio,
  currentUserEmail,
  ADD_MESSAGE,
  UPDATE_PROFILE_LOCALLY,
}: SettingsPageTypes) => {
  const [mode, setMode] = useState(1);

  const [username, setUsername] = useState(currentUserName);
  const [email, setEmail] = useState(currentUserEmail);
  const [bio, setBio] = useState(currentUserBio);
  const [updating, setUpdating] = useState(false);
  const [updatingProfilePicture, setUpdatingProfilePicture] = useState(false);

  //image file
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const newImage = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const updateImage = (e: FormEvent) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    let file = files[0] || "";
    if (file) {
      if (["jpg", "png", "jpeg"].includes(file.name.slice(file.name.indexOf(".") + 1))) {
        setSelectedImage(file);
      } else {
        ADD_MESSAGE("Image must be on jpg,png or jpeg format.");
      }
    }

    setTimeout(() => {
      ADD_MESSAGE(null);
    }, 3000);
  };

  const updateProfilePictureFinal = () => {
    if (selectedImage && !updatingProfilePicture) {
      setUpdatingProfilePicture(true);
      new Compressor(selectedImage, {
        quality: 0.6,
        success(result: any) {
          const uploadedImage = storage.ref(`/profilePics/${currentUserUid}/${result.name}`).put(result);
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
                        ADD_MESSAGE("Successfully updated the profile picture");
                      } else {
                        ADD_MESSAGE(res);
                      }
                      setUpdating(false);
                    })
                    .catch((err) => ADD_MESSAGE(err.message));
                });
            }
          );
        },
      });
    }
  };

  const updateProfile = (e: any) => {
    e.preventDefault();
    setUpdating(true);

    if (username === currentUserName && email === currentUserEmail && bio === currentUserBio) {
      ADD_MESSAGE("Nothing to Update.");
      setUpdating(false);
    } else {
      if (!username.trim().includes(" ") && username.trim().length >= 5 && username.trim().length <= 25) {
        updateUserData(username.trim().toLowerCase(), email || "", bio || "", currentUserName).then((res) => {
          if (res !== "success") {
            ADD_MESSAGE(res);
          } else {
            ADD_MESSAGE("Successfully updated the profile.");
            UPDATE_PROFILE_LOCALLY({ bio, username, email });
          }
          setUpdating(false);
        });
      } else {
        setUpdating(false);
        ADD_MESSAGE("Username must be spaceless between 5 and 25 characters.");
      }
    }

    setTimeout(() => {
      ADD_MESSAGE(null);
    }, 3000);
  };

  //for password update
  const [initialPassword, setInitialPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const updatePasswordFinal = (e: any) => {
    e.preventDefault();
    setUpdating(true);
    if (newPassword1 === newPassword2) {
      if (newPassword1.trim().length >= 5 && newPassword1.trim().length <= 25) {
        updatePassword(currentUserUid, initialPassword, newPassword1).then((res) => {
          setUpdating(false);
          if (res === "success") {
            ADD_MESSAGE("Successfully changed password");
            setInitialPassword("");
            setNewPassword1("");
            setNewPassword2("");
          } else {
            ADD_MESSAGE(res);
          }
        });
      } else {
        setUpdating(false);
        ADD_MESSAGE("new passwords must be between 5 to 25 characters.");
      }
    } else {
      setUpdating(false);
      ADD_MESSAGE("new passwords must match.");
    }

    setTimeout(() => {
      ADD_MESSAGE(null);
    }, 3000);
  };

  return (
    <div className={styles.SettingsPage}>
      <div className={styles.Tabs}>
        <button onClick={() => setMode(1)} className={mode === 1 ? styles.ActiveTabButton : ""}>
          Update Profile
        </button>
        <button onClick={() => setMode(2)} className={mode === 2 ? styles.ActiveTabButton : ""}>
          Change Password
        </button>
      </div>

      {mode === 1 && (
        <div>
          <section className={styles.SectionOne}>
            <img src={newImage || currentUserProfileImage} alt="profile-image" />

            <div>
              <p>{currentUserName}</p>
              <label htmlFor="image" style={newImage ? { display: "none" } : undefined}>
                Change Profile Photo
              </label>
              <label htmlFor="u-btn" style={!newImage ? { display: "none" } : undefined}>
                {updatingProfilePicture ? "Updating Profile Picture.." : "Confirm New Profile Photo"}
              </label>
              <button style={{ display: "none" }} id="u-btn" onClick={updateProfilePictureFinal}>
                Update Profile Photo
              </button>
              <input type="file" style={{ display: "none" }} id="image" onChange={updateImage} accept="image/*" />
            </div>
          </section>

          <section>
            <form onSubmit={updateProfile}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={username.toLowerCase()}
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email">Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="Bio">Bio</label>
              <textarea onChange={(e) => setBio(e.target.value)}>{bio}</textarea>

              <button disabled={updating} className={styles.SubmitButton} onClick={updateProfile}>
                Submit
              </button>
            </form>
          </section>
        </div>
      )}

      {mode === 2 && (
        <div>
          <form onSubmit={updatePasswordFinal}>
            <label htmlFor="password1">Current Password</label>
            <input
              type="password"
              value={initialPassword}
              id="username"
              onChange={(e) => setInitialPassword(e.target.value)}
            />
            <label htmlFor="password2">New Password</label>
            <input type="password" value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} />
            <label htmlFor="password3">Retype New Password</label>
            <input type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} />
            <button disabled={updating} className={styles.SubmitButton}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUserEmail: state.user.currentUserData.email,
    currentUserBio: state.user.currentUserData.bio,
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
    currentUserName: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    UPDATE_PROFILE_LOCALLY: (data: any) => dispatch(userActions.UPDATE_PROFILE_LOCALLY(data)),
    ADD_MESSAGE: (message: any) => dispatch(postActions.ADD_MESSAGE(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
