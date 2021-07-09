import { useState } from "react";
import { connect } from "react-redux";
import { updateUserData, updateProfilePicture } from "../services/userServices";
import storage from "../firebase/storage";
import Compressor from "compressorjs";
import { Link } from "react-router-dom";
import * as postActions from "../redux/post/postsActions";
import * as userActions from "../redux/user/userActions";

const EditProfilePage = ({
  currentUserProfileImage,
  currentUserName,
  currentUserUid,
  currentUserBio,
  currentUserEmail,
  ADD_MESSAGE,
  UPDATE_PROFILE_LOCALLY,
}) => {
  const [username, setUsername] = useState(currentUserName);
  const [email, setEmail] = useState(currentUserEmail);
  const [bio, setBio] = useState(currentUserBio);
  const [updating, setUpdating] = useState(false);
  const [updatingProfilePicture, setUpdatingProfilePicture] = useState(false);

  //image file
  const [selectedImage, setSelectedImage] = useState(null);
  const newImage = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.slice(file.name.slice(file.name.lastIndexOf("."))).includes("jpg", "png", "jpeg")) {
        setSelectedImage(e.target.files[0]);
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
        success(result) {
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

  const updateProfile = (e) => {
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

  return (
    <div className="edit--profile-page">
      <section className="section-one">
        <img src={newImage || currentUserProfileImage} alt="profile-image" />

        <div>
          <p>{currentUserName}</p>
          <label htmlFor="image" style={newImage ? { display: "none" } : null}>
            Change Profile Photo
          </label>
          <label htmlFor="u-btn" style={!newImage ? { display: "none" } : null}>
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
          <textarea type="text" onChange={(e) => setBio(e.target.value)}>
            {bio}
          </textarea>

          <button disabled={updating} className="submit-btn" onClick={updateProfile}>
            Submit
          </button>
          <Link to="/edit/password">Change Password</Link>
        </form>
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

const mapDispatchToProps = (dispatch) => {
  return {
    UPDATE_PROFILE_LOCALLY: (data) => dispatch(userActions.UPDATE_PROFILE_LOCALLY(data)),
    ADD_MESSAGE: (message) => dispatch(postActions.ADD_MESSAGE(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
