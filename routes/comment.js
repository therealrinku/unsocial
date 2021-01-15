const router = require("express").Router();
const db = require("../database/db");

router.post("/addcomment", (req, res) => {
  db.query(
    `INSERT INTO comments(comment,commenter_uid,post_uid,post_owner_uid,posted_date)
    VALUES('${req.body.comment}','${req.body.commenter_uid}',
    '${req.body.post_uid}','${req.body.post_owner_uid}','${req.body.posted_date}')`,
    (err, res1) => {
      if (!err) res.send("success");
      else throw err;
    }
  );
});

module.exports = router;
