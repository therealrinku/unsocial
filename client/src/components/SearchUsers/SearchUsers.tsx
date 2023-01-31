import { useEffect, useState } from "react";
import { getSearchedUsers } from "../../services/userServices";
import { Link } from "react-router-dom";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import styles from "./SearchUsers.module.scss";

type SearchUserTypes={
  closeFunc:Function;
}

const SearchUsers = ({closeFunc}:SearchUserTypes) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      getSearchedUsers(searchQuery.trim().toLowerCase()).then((res) => {
        setSearchResults(res);
      });
    }
  }, [searchQuery]);

  const handleClick=()=>{
    setSearchQuery("")
    closeFunc()
  }

  return (
    <div className={styles["Search-Users-Box"]}>
      <input
        type="text"
        placeholder="Search for users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section
        style={
          searchQuery.trim() === ""
            ? { display: "none" }
            : searchResults.length <= 0
            ? { marginTop: "93px" }
            : undefined
        }
      >
        {searchResults.length >= 1 ? (
          searchResults.map((user: any) => {
            return (
              <Link
                onClick={()=>handleClick()}
                to={`/user/${user.username}`}
                key={user.username}
                className={styles["Searched-User"]}
              >
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
      </section>
    </div>
  );
};

export default SearchUsers;
