import { useState } from "react";
import { connect } from "react-redux";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";
import { updateUserData } from "../services/userServices";

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

  //image file
  const [selectedImage, setSelectedImage] = useState(null);
  const newImage = selectedImage ? URL.createObjectURL(selectedImage) : null;

  const updateImage = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
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
          <label htmlFor="image">Change Profile Photo</label>
          <input
            type="file"
            style={{ display: "none" }}
            id="image"
            onChange={updateImage}
          />
        </div>
      </section>

      <section>
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
          <p>{error}</p>
          <p style={{ color: "green" }}>{successMsg}</p>
          <button disabled={updating}>Submit</button>
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

export default connect(mapStateToProps)(EditProfilePage);
