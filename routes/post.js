const router = require("express").Router();
const db = require("../database/db");
const tokenVerifier = require("../utils/tokenVerifyMiddleware");
const jwt = require("jsonwebtoken");
const getFromHeader = require("../utils/getFromHeader");

//get posts for explore page
router.get("/explorePosts", tokenVerifier, (req, res) => {
  db.query(
    `SELECT post_id,image_url as post_image,posted_date as post_posted_date FROM posts order BY posted_date`,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//get selected post
router.get("/getPost/:post_id", (req, res) => {
  const user_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";

  db.query(
    `SELECT 
    '${user_uid}' = ANY (likers) AS liked_by_me,
    '${user_uid}' = ANY (dislikers) AS disliked_by_me,
    (post_uid)::text=ANY(SELECT unnest(saved_posts_uids) FROM users WHERE uid='${user_uid}') 
    AS i_have_saved,
    (SELECT CAST(COUNT(*) AS int) FROM comments WHERE (post_uid)::uuid=posts.post_uid) AS post_comments_count,
    '${user_uid}'=ANY(followers) AS followed_by_me,
    post_uid,username as poster_username,
    post_id,
    owner_uid as poster_uid,
    profile_image_url as poster_profileImage,
    image_url as post_image,
    array_length(likers,1) as post_likes_count,
    array_length(dislikers,1) as post_dislikes_count,
    posted_date as post_posted_date,
    status as post_status
    FROM posts INNER JOIN users ON (posts.owner_uid)=(users.uid)::text 
    WHERE (post_id)::text='${req.params.post_id}'`,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//get saved posts
router.get("/savedPosts", (req, res) => {
  const user_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";

  db.query(
    `SELECT post_id,image_url as post_image FROM posts WHERE (post_uid)::text
    IN (SELECT unnest(saved_posts_uids) 
    FROM users WHERE (uid)::text='${user_uid}')`,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//get visited profile posts
router.get("/posts/:owner_username", (req, res) => {
  const user_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";

  db.query(
    `SELECT 
    '${user_uid}' = ANY (likers) AS liked_by_me,
    (post_uid)::text=ANY(SELECT unnest(saved_posts_uids) FROM users WHERE uid='${user_uid}') 
    AS i_have_saved,
    post_uid,username as poster_username,
    post_id,
    profile_image_url as poster_profileImage,
    image_url as post_image,
    array_length(likers,1) as post_likes_count,
    posted_date as post_posted_date,
    status as post_status
    FROM posts INNER JOIN users ON (posts.owner_uid)=(users.uid)::text 
    WHERE users.username='${req.params.owner_username}'
    `,
    (err, res0) => {
      if (err) throw err;
      else res.send(res0.rows);
    }
  );
});

//upload post
router.post("/upload/new", tokenVerifier, (req, res) => {
  db.query(
    `INSERT INTO posts(owner_uid,image_url,status,posted_date) 
      VALUES('${req.body.owner_uid}','${req.body.image_url}',
      '${req.body.status}','${new Date()}') returning post_id,post_uid`,
    (err, res1) => {
      if (!err) {
        res.send(res1.rows);
      } else throw err;
    }
  );
});

//delete post
router.post("/delete", tokenVerifier, (req, res) => {
  db.query(`DELETE FROM posts WHERE post_uid='${req.body.post_uid}'`, (err, res1) => {
    if (!err) res.send("done");
    else throw err;

    db.query(`DELETE FROM notifications WHERE post_uid='${req.body.post_uid}'`);
  });
});

//get post likers
router.get("/likers/:post_uid", (req, res) => {
  db.query(
    `SELECT username,profile_image_url FROM users WHERE (uid)::text IN 
    (SELECT unnest(likers) FROM posts WHERE (post_uid)::text='${req.params.post_uid}')
  `,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

//get dislikers not created yet lol

//unsave post
router.post("/unsave", tokenVerifier, (req, res) => {
  db.query(
    `UPDATE users SET saved_posts_uids=array_remove(saved_posts_uids,'${req.body.post_uid}')
        WHERE username='${req.body.unsaver_username}'`,
    (err, res1) => {
      if (!err) res.send("done");
      else throw err;
    }
  );
});

//save post
router.post("/save", tokenVerifier, (req, res) => {
  db.query(
    `UPDATE users SET saved_posts_uids=array_append(saved_posts_uids,'${req.body.post_uid}')
      WHERE username='${req.body.saver_username}'`,
    (err, res1) => {
      if (!err) res.send("done");
      else throw err;
    }
  );
});

//unlike post
router.post("/unlike", tokenVerifier, (req, res) => {
  const unliker_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";

  db.query(
    `UPDATE posts SET likers=array_remove(likers,'${unliker_uid}') WHERE post_uid='${req.body.post_uid}'`,
    (err, _) => {
      if (!err) res.send("done");
      else throw err;

      db.query(
        `DELETE FROM notifications WHERE interactor_uid='${unliker_uid}' 
        AND post_uid='${req.body.post_uid}'
        AND notification='like post'`
      );
    }
  );
});

//like post
router.post("/like", tokenVerifier, (req, res) => {
  const liker_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";
  db.query(
    `UPDATE posts SET likers=array_append(likers,'${liker_uid}') WHERE post_uid='${req.body.post_uid}'`,
    (err, _) => {
      if (!err) res.send("done");
      else throw err;

      if (liker_uid !== req.body.post_owner_uid) {
        db.query(
          `INSERT INTO notifications(notification,owner_uid,interactor_uid,post_uid,date)
              VALUES('like post',
              '${req.body.post_owner_uid}','${liker_uid}','${req.body.post_uid}','${new Date()}')`
        );
      }
    }
  );
});

//undislike post
router.post("/undislike", tokenVerifier, (req, res) => {
  const undisliker_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";
  db.query(
    `UPDATE posts SET dislikers=array_remove(dislikers,'${undisliker_uid}') WHERE post_uid='${req.body.post_uid}'`,
    (err, _) => {
      if (!err) res.send("done");
      else throw err;

      db.query(
        `DELETE FROM notifications WHERE interactor_uid='${undisliker_uid}' 
        AND post_uid='${req.body.post_uid}'
        AND notification='dislike post'`
      );
    }
  );
});

//dislike post
router.post("/dislike", tokenVerifier, (req, res) => {
  const disliker_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";
  db.query(
    `UPDATE posts SET dislikers=array_append(dislikers,'${disliker_uid}') WHERE post_uid='${req.body.post_uid}'`,
    (err, _) => {
      if (!err) res.send("done");
      else throw err;

      if (disliker_uid !== req.body.post_owner_uid) {
        db.query(
          `INSERT INTO notifications(notification,owner_uid,interactor_uid,post_uid,date)
              VALUES('dislike post',
              '${req.body.post_owner_uid}','${disliker_uid}','${req.body.post_uid}','${new Date()}')`
        );
      }
    }
  );
});

//getFeed
router.get("/feed", tokenVerifier, (req, res) => {
  const user_uid = getFromHeader(req.headers, "uid") || "09bdd5a4-4cdd-3ae1-9122-dfb66f8afc23";

  db.query(
    `SELECT 
    '${user_uid}' = ANY (likers) AS liked_by_me,
    '${user_uid}' = ANY (dislikers) AS disliked_by_me,
    (post_uid)::text=ANY(SELECT unnest(saved_posts_uids) FROM users WHERE uid='${user_uid}') AS i_have_saved,
    (SELECT CAST(COUNT(*) AS int) FROM comments WHERE (post_uid)::uuid=posts.post_uid) AS post_comments_count,
    post_uid,username as poster_username,
    post_id,
    true as inFeed,
    profile_image_url as poster_profileImage,
    image_url as post_image,
    owner_uid as poster_uid,
    array_length(likers,1) as post_likes_count,
    array_length(dislikers,1) as post_dislikes_count,
    posted_date as post_posted_date,
    status as post_status
    FROM posts INNER JOIN users ON (posts.owner_uid)=(users.uid)::text 
    WHERE posts.owner_uid=ANY(SELECT unnest(array_append(following,'${user_uid}')) 
    FROM users WHERE uid='${user_uid}')
    `,
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
