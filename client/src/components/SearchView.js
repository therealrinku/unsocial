import { useEffect, useState } from "react";
import { getSearchedUsers } from "../services/userServices";
import { Link } from "react-router-dom";

const SearchView = ({ width }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      getSearchedUsers(searchQuery).then((res) => {
        setSearchResults(res);
      });
    }
  }, [searchQuery]);

  return (
    <div
      className="search--bar-page"
      style={width ? { width: width, marginLeft: "-9px" } : null}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section
        className="search--bar"
        style={searchQuery.trim() === "" ? { display: "none" } : null}
      >
        {searchResults.length >= 1 ? (
          searchResults.map((user) => {
            return (
              <Link
                onClick={() => setSearchQuery("")}
                to={`/${user.username}`}
                key={user.username}
                className="searched--user"
              >
                <img src={user.profile_image_url} alt="profileimage" />
                <p>{user.username}</p>
              </Link>
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
