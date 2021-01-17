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
          <input type="text" value={currentUserName} id="username" />
          <label htmlFor="email">Email</label>
          <input type="text" value={currentUserEmail} />
          <label htmlFor="Bio">Bio</label>
          <textarea type="text">{currentUserBio}</textarea>
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
