import { useState } from "react";
import { connect } from "react-redux";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";

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

  return (
    <div className="edit--profile-page">
      <Navbar />
      <MobileNavbar />

      <section className="section-one">
        <img src={currentUserProfileImage} alt="profile-image" />

        <div>
          <p>{currentUserName}</p>
          <button>Change Profile Photo</button>
        </div>
      </section>

      <section>
        <form>
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
          <button>Submit</button>
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
