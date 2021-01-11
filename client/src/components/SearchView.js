import { useState } from "react";

const SearchView = ({ users = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="search--bar-page">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <section className="search--bar">
        {users.map((user) => {
          <div className="user"></div>;
        })}
      </section>
    </div>
  );
};

export default SearchView;
