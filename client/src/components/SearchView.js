const SearchView = ({ users }) => {
  return (
    <div className="search--bar">
      {users.map((user) => {
        <div className="user"></div>;
      })}
    </div>
  );
};

export default SearchView;
