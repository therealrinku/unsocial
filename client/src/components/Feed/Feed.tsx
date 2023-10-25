import { Link } from "react-router-dom";
import Post from "../Post";

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
        <section className="bg-white border h-[300px] p-3 px-5 text-sm">
          <p className="border-b pb-2">People you may like to connect with</p>

          <div className="mt-5 flex flex-col gap-4">
            <Link to={`/user/samantha`} className="flex items-center gap-2 hover:underline">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGdpcmxzfGVufDB8fDB8fHww"
              />
              <p>samanthaflair_</p>
            </Link>
            <Link to={`/user/samantha`} className="flex items-center gap-2 hover:underline">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1516195851888-6f1a981a862e?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGdpcmxzfGVufDB8fDB8fHww"
              />
              <p>olivabanker</p>
            </Link>
            <Link to={`/user/samantha`} className="flex items-center gap-2 hover:underline">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGdpcmxzfGVufDB8fDB8fHww"
              />
              <p>sabrinanotcarpentar</p>
            </Link>
          </div>
        </section>

        <p className="text-sm font-bold mt-2">2023 @Robosocial</p>
      </div>
    </div>
  );
};

export default Feed;
