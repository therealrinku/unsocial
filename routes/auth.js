const db = require("../database/db");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//login
router.post("/login", (req, res) => {
  db.query(
    `SELECT profile_image_url,bio,username,uid,email,password FROM users WHERE username='${req.body.username}'`,
    (err, res1) => {
      if (res1.rows.length > 0) {
        const { profile_image_url, uid, bio, email, username, password } = res1.rows[0];
        bcrypt.compare(req.body.password, password, (err, result) => {
          if (result) {
            //generating jwt token
            const token = jwt.sign({ email, uid }, process.env.JWT_SECRET_KEY, {
              expiresIn: "7d",
            });
            res.status(200).send({ profile_image_url, uid, username, bio, email, token });
          } else res.send("invalid password");
        });
      } else {
        res.send("invalid username");
      }
    }
  );
});

//signup user
router.post("/signup", (req, res) => {
  db.query(`SELECT username FROM users WHERE username='${req.body.username}'`, (err, res1) => {
    if (res1.rows.length <= 0) {
      bcrypt.hash(req.body.password, 10, (err1, hash) => {
        if (!err) {
          db.query(
            `INSERT INTO users(email,username,password,joined_date,profile_image_url)
          VALUES('${req.body.email}','${req.body.username}','${hash}','${new Date()}','https://bit.ly/3dPEtHZ')`,
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
  });
});

module.exports = router;
