import { useEffect, useState } from "react";
import { getSearchedUsers } from "../services/userServices";

const SearchView = () => {
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
    <div className="search--bar-page">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section className="search--bar">
        {searchResults.map((user) => {
          <div key={user.username}>
            <img src={user.profile_image_url} alt="profileimage" />
            <p>{user.username}</p>
          </div>;
        })}
      </section>
    </div>
  );
};

export default SearchView;
