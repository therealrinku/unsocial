const db = require("../database/db");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//login
router.post("/login", (req, res) => {
  db.query(
    `SELECT password FROM users WHERE username='${req.body.username}'`,
    (err, res1) => {
      if (res1.rows.length > 0) {
        if (res1.rows[0].password === req.body.password) {
          res.send("success");
        } else {
          res.send("invalid password");
        }
      } else {
        res.send("invalid username");
      }
    }
  );
});

//signup user
router.post("/signup", (req, res) => {
  db.query(
    `SELECT username FROM users WHERE username='${req.body.username}'`,
    (err, res1) => {
      if (res1.rows.length <= 0) {
        bcrypt.hash(req.body.password, 10, (err1, hash) => {
          if (!err) {
            db.query(
              `INSERT INTO users(email,username,password,joined_date,profile_image_url)
          VALUES('${req.body.email}','${
                req.body.username
              }','${hash}','${new Date()}','https://ddf.com')`,
              (err2, res2) => {
                if (!err2) res.send("success");
                else throw err2;
              }
            );
          } else {
            throw err1;
          }
        });
      } else {
        res.send("username already taken!");
      }
    }
  );
});

module.exports = router;
