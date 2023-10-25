import Post from "../Post";
import MainSideview from "../MainSideview";

type FeedTypes = {
  posts: any;
};

const Feed = ({ posts }: FeedTypes) => {
  return (
    <div className="w-full lg:w-[85%] xl:w-[75%] mx-auto flex justify-center gap-24">
      <section className="w-full md:w-[75%] lg:w-[70%] xl:w-[55%]">
        {posts
          .sort((a: any, b: any) => {
            return new Date(b.post_posted_date).valueOf() - new Date(a.post_posted_date).valueOf();
          })
          .map((post: any) => {
            return (
              <Post
                key={post.post_uid}
                post_id={post.post_id}
                haveILiked={post.liked_by_me}
                haveIDisliked={post.disliked_by_me}
                post_uid={post.post_uid}
                poster_username={post.poster_username}
                poster_profileImage={post.poster_profileimage}
                post_image={post.post_image}
                post_postedDate={post.post_posted_date}
                post_likesCount={post.post_likes_count}
                post_dislikesCount={post.post_dislikes_count}
                post_status={post.post_status}
                post_owner_uid={post.poster_uid}
                post_commentsCount={post.post_comments_count}
                haveISaved={post.i_have_saved}
              />
            );
          })}
      </section>

      <div className="hidden lg:block lg:w-[35%] xl:w-[30%] sticky top-[80px]  h-[300px]">
        <MainSideview />
      </div>
    </div>
  );
};

export default Feed;
