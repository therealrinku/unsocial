import { connect } from "react-redux";
import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";

const EditProfilePage = ({
  currentUserProfileImage,
  currentUserName,
  currentUserUid,
}) => {
  return (
    <div className="edit--profile-page">
      <Navbar />
      <MobileNavbar />
      <section>
        <img src={currentUserProfileImage} alt="profile-image" />
        <p>{currentUserName}</p>
        <button>Change Profile Photo</button>
      </section>

      <section>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" value={currentUserName} id="username" />
          <label htmlFor="email" value="email">
            Email
          </label>
          <label htmlFor="Bio">Bio</label>
          <input type="text" value="bio"></input>
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserProfileImage: state.user.currentUserData.profile_image_url,
    currentUserName: state.user.currentUserData.username,
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(EditProfilePage);
