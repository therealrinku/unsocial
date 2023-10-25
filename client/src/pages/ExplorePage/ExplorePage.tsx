import { useEffect, useState } from "react";
import styles from "./ExplorePage.module.scss";
import CoverImage from "../../assets/coverImage.jpg";
import { getRecommendedUsers, getSearchedUsers } from "../../services/userServices";
import { Link } from "react-router-dom";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import { connect } from "react-redux";

type ProfilePageTypes = {
  history: any;
  currentUserUid: string;
  profiles: Array<any>;
  GET_PROFILE_DATA: Function;
  currentUsername: string;
};

const Profilepage = ({ currentUserUid }: ProfilePageTypes) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      getSearchedUsers(searchQuery.trim().toLowerCase()).then((res) => {
        setSearchResults(res);
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    getRecommendedUsers().then((res) => {
      setSearchResults(res);
    });

    document.body.style.overflow = "auto";
    //set document title
    document.title = "Explore";

    return () => {
      document.title = "robosocial";
    };
  }, []);

  return (
    <div className={styles.ExplorePage}>
      <img src={CoverImage} alt="cover-image" className={styles.CoverImage} />
      <input
        type="search"
        value={searchQuery}
        placeholder="Search for your friends"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        {searchResults.length >= 1 ? (
          searchResults.map((user: any) => {
            return (
              <Link to={`/user/${user.username}`} key={user.username} className={styles["Searched-User"]}>
                <img
                  alt="profileimage"
                  data-src={user.profile_image_url}
                  src={ProfilePicPlaceholder}
                  className="lazy-image"
                  onLoad={lazyLoadImage}
                />
                <p>{user.username}</p>
              </Link>
            );
          })
        ) : (
          <p className={styles["Nothing-Found"]}>Nothing found</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(Profilepage);
