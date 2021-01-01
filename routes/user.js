const db = require("../database/db");
const router = require("express").Router();

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
