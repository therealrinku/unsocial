import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecommendedUsers } from "../../services/userServices";

export default function MainSideview() {
  const [loading, setLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    getRecommendedUsers().then((res) => {
      setRecommendedUsers(res);
      setLoading(false);
    });
  }, []);

  return (
    <Fragment>
      <section className="bg-white border py-3 text-sm">
        <p className="border-b pb-2 px-5">People you may like to connect with</p>

        <div className="mt-5 flex flex-col gap-4 px-5 pb-2">
          {recommendedUsers.slice(0, 5).map((user: any) => {
            return (
              <Link to={`/user/${user.username}`} className="flex items-center gap-2 hover:underline">
                <img className="w-8 h-8 rounded-full object-cover" src={user.profile_image_url} />
                <p>{user.username}</p>
              </Link>
            );
          })}

          {/* <Link to={`/user/samantha`} className="flex items-center gap-2 hover:underline">
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
          </Link> */}
        </div>
      </section>

      <p className="text-sm font-bold mt-2">2023 @Robosocial</p>
    </Fragment>
  );
}
