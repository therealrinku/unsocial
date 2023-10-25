import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecommendedUsers } from "../../services/userServices";
import { AiOutlineGithub } from "react-icons/ai";

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
        <p className="border-b pb-2 px-5">People you may like to follow</p>

        <div className="mt-5 flex flex-col gap-4 px-5 pb-2">
          {recommendedUsers.slice(0, 5).map((user: any) => {
            return (
              <Link to={`/user/${user.username}`} className="flex items-center gap-2 hover:underline">
                <img className="w-8 h-8 rounded-full object-cover" src={user.profile_image_url} />
                <p>{user.username}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="flex gap-2 mt-3">
        <a
          target="_blank"
          href="https://github.com/therealrinku/robosocial"
          className="hover:underline text-sm flex items-center gap-1"
        >
          <AiOutlineGithub size={18} />
        </a>
        <p className="text-sm font-bold ">2023@robosocial</p>
      </div>
    </Fragment>
  );
}
