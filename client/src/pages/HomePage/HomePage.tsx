import Feed from "../../components/Feed";
import { connect } from "react-redux";
import { Fragment } from "react";
import Loader from "../../components/Loader";
import { useHistory } from "react-router";
import TwoColumnLayout from "../../components/TwoColumnLayout";
import { AiOutlineInbox } from "react-icons/ai";
import { FiCompass } from "react-icons/fi";

type HomePageTypes = {
  feed: Array<object>;
  loading: boolean;
};

const Homepage = ({ feed, loading }: HomePageTypes) => {
  const history = useHistory();

  return (
    <Fragment>
      {loading && <Loader fullPage />}

      {!loading && (
        <div>
          {feed.length > 0 ? (
            <TwoColumnLayout
              component1={() => (
                <div className="border text-sm bg-white p-5 h-[307px] flex flex-col items-center justify-center">
                  <span>
                    <AiOutlineInbox size={50} />
                  </span>

                  <p className="my-5 text-center">
                    Your feed is empty, <br />
                    start following people to fill it up.
                  </p>

                  <button
                    className="flex items-center  gap-2 text-sm bg-[#018e23] text-white py-[6px] px-5"
                    onClick={() => history.push("/explore")}
                  >
                    <FiCompass />
                    Explore people
                  </button>
                </div>
              )}
            />
          ) : (
            <Feed posts={feed} />
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.posts.loading_feed,
    feed: state.posts.posts.filter((post: any) => post.infeed === true),
  };
};

export default connect(mapStateToProps)(Homepage);
