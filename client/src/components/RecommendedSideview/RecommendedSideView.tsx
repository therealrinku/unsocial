import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as userActions from "../../redux/user/userActions";

function RecommendedSideview({ recommendedUsers, GET_RECOMMENDED_USERS }: any) {
  useEffect(() => {
    GET_RECOMMENDED_USERS();
  }, []);

  return (
    <Fragment>
      <section className="bg-white border py-3 text-sm">
        <p className="border-b pb-2 px-5">People you may like to follow</p>

        <div className="mt-5 flex flex-col gap-4 px-5 pb-2">
          {recommendedUsers?.slice(0, 5)?.map((user: any) => {
            return (
              <Link to={`/user/${user.username}`} className="flex items-center gap-2 hover:underline">
                <img className="w-8 h-8 rounded-full object-cover" src={user.profile_image_url} />
                <p>{user.username}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    recommendedUsers: state.user.recommendedUsers || [],
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GET_RECOMMENDED_USERS: () => dispatch(userActions.GET_RECOMMENDED()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedSideview);
