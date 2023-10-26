import { useEffect, useState } from "react";
import { getRecommendedUsers, getSearchedUsers } from "../../services/userServices";
import { Link } from "react-router-dom";
import lazyLoadImage from "../../utilities/lazyLoadImage.js";
import ProfilePicPlaceholder from "../../assets/avatar.jpg";
import { connect } from "react-redux";
import TwoColumnLayout from "../../components/TwoColumnLayout";
import { AiOutlineInbox } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    if (searchQuery.trim() !== "") {
      getSearchedUsers(searchQuery.trim().toLowerCase()).then((res) => {
        setSearchResults(res);
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    getRecommendedUsers().then((res) => {
      setSearchResults(res);
      setLoading(false);
    });

    document.body.style.overflow = "auto";
    //set document title
    document.title = "Explore";

    return () => {
      document.title = "robosocial";
    };
  }, []);

  return (
    <TwoColumnLayout
      component1={() => (
        <div className="text-sm bg-white p-5 border">
          <input
            type="search"
            className="text-sm border px-2 py-[6px] w-full mb-5 focus:border-[#24B35A]"
            value={searchQuery}
            placeholder="Search for your friends"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-col gap-4">
            {searchResults.length >= 1 ? (
              searchResults.map((user: any) => {
                return (
                  <Link
                    to={`/user/${user.username}`}
                    key={user.username}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <img
                      alt="profileimage"
                      data-src={user.profile_image_url ?? ProfilePicPlaceholder}
                      src={ProfilePicPlaceholder}
                      className="lazy-image w-7 h-7 rounded-full object-cover"
                      onLoad={lazyLoadImage}
                    />
                    <p>{user.username}</p>
                  </Link>
                );
              })
            ) : loading ? (
              <div className="flex flex-col items-center gap-3 my-20">
                <FiRefreshCw size={30} />
                <p className="text-sm">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 my-20">
                <AiOutlineInbox size={30} />
                <p className="text-sm">Nothing found</p>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentUserUid: state.user.currentUserData.uid,
  };
};

export default connect(mapStateToProps)(Profilepage);
