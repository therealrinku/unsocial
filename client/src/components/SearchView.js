import { useEffect, useState } from "react";
import { getSearchedUsers } from "../services/userServices";
import { Link } from "react-router-dom";

const SearchView = ({ width }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      getSearchedUsers(searchQuery.trim().toLowerCase()).then((res) => {
        setSearchResults(res);
      });
    }
  }, [searchQuery]);

  return (
    <div className="search--bar-page" style={width ? { width: width, marginLeft: "-9px" } : null}>
      <input
        type="text"
        placeholder="Search for users"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section className="search--bar" style={searchQuery.trim() === "" ? { display: "none" } : null}>
        {searchResults.length >= 1 ? (
          searchResults.map((user) => {
            return (
              <span key={user.username}>
                <img src={user.profile_image_url} alt="profileimage" />
                <Link
                  onClick={() => setSearchQuery("")}
                  to={`/user/${user.username}`}
                  key={user.username}
                  className="searched--user"
                >
                  <p>{user.username}</p>
                </Link>
              </span>
            );
          })
        ) : (
          <p className="nothing--found">Nothing found</p>
        )}
      </section>
    </div>
  );
};

export default SearchView;
