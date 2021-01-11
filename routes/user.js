const db = require("../database/db");
const router = require("express").Router();

//get searched users
router.get("/:search", (req, res) => {
  db.query(
    `SELECT username,profile_image_url FROM users WHERE username LIKE '%${req.params.search_query}%' `,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//get following
router.get("/followings/:username", (req, res) => {
  db.query(
    `SELECT username,profile_image_url FROM users WHERE (uid)::text
    IN (SELECT unnest(following) FROM users WHERE username='${req.params.username}')`,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//get followers
router.get("/followers/:username", (req, res) => {
  db.query(
    `SELECT username,profile_image_url FROM users WHERE (uid)::text
    IN (SELECT unnest(followers) FROM users WHERE username='${req.params.username}')`,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//unfollow
const RemoveFollowing = (unfollowing_user_uid, unfollower_user_uid) => {
  return new Promise((resolve) => {
    db.query(
      `UPDATE users SET following=array_remove(following,'${unfollowing_user_uid}')
		 WHERE uid='${unfollower_user_uid}'`,
      (err, res0) => {
        if (!err) {
          resolve("done");
        } else {
          throw err;
        }
      }
    );
  });
};

const RemoveFollower = (unfollowing_user_uid, unfollower_user_uid) => {
  return new Promise((resolve) => {
    db.query(
      `UPDATE users SET followers=array_remove(followers,'${unfollower_user_uid}')
		   WHERE uid='${unfollowing_user_uid}'`,
      (err, res0) => {
        if (!err) {
          resolve("done");
        } else {
          throw err;
        }
      }
    );
  });
};

router.post("/unfollow", (req, res) => {
  RemoveFollowing(req.body.unfollowing_user_uid, req.body.unfollower_user_uid)
    .then((res0) => {
      if (res0 === "done") {
        RemoveFollower(
          req.body.unfollowing_user_uid,
          req.body.unfollower_user_uid
        )
          .then((res1) => {
            if (res1 === "done") {
              res.send("done");
            }
          })
          .catch((err1) => {
            throw err1;
          });
      }
    })
    .catch((err) => {
      throw err;
    });
});

//follow
const AddFollowing = (following_user_uid, follower_user_uid) => {
  return new Promise((resolve) => {
    db.query(
      `UPDATE users SET following=array_append(following,'${following_user_uid}')
		 WHERE uid='${follower_user_uid}'`,
      (err, res0) => {
        if (!err) {
          resolve("done");
        } else {
          throw err;
        }
      }
    );
  });
};

const AddFollower = (following_user_uid, follower_user_uid) => {
  return new Promise((resolve) => {
    db.query(
      `UPDATE users SET followers=array_append(followers,'${follower_user_uid}')
		   WHERE uid='${following_user_uid}'`,
      (err, res0) => {
        if (!err) {
          resolve("done");
        } else {
          throw err;
        }
      }
    );
  });
};

router.post("/follow", (req, res) => {
  AddFollowing(req.body.following_user_uid, req.body.follower_user_uid)
    .then((res0) => {
      if (res0 === "done") {
        AddFollower(req.body.following_user_uid, req.body.follower_user_uid)
          .then((res1) => {
            if (res1 === "done") {
              res.send("done");
            }
          })
          .catch((err1) => {
            throw err1;
          });
      }
    })
    .catch((err) => {
      throw err;
    });
});

//get current user data
router.get("/loggeninuserinfo/:username", (req, res) => {
  db.query(
    `SELECT username,uid,profile_image_url FROM users WHERE username='${req.params.username}'`,
    (err, res0) => {
      if (err) {
        throw err;
      } else {
        res.send(res0.rows);
      }
    }
  );
});

//get visited profile info
router.get("/visiteduserinfo/:username/:current_user_uid", (req, res) => {
  db.query(
    `SELECT username,uid,profile_image_url,
    (SELECT COUNT(*) FROM posts WHERE owner_uid=(uid)::text)::int AS posts_count,
    '${req.params.current_user_uid}'=ANY(followers) AS followed_by_me,
    array_length(followers,1) as followers_count,
    array_length(following,1) as following_count
    FROM users WHERE username='${req.params.username}'`,
    (err, res0) => {
      if (err) {
        throw err;
      } else {
        res.send(res0.rows);
      }
    }
  );
});

module.exports = router;
