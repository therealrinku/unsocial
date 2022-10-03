const db = require("../database/db");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", (request, response) => {
  const { username: userEnteredUsername, password: userEnteredPassword } = request.body;
  const query = `SELECT profile_image_url,bio,username,uid,email,password FROM users WHERE username='${userEnteredUsername}'`;

  db.query(query, (err, res) => {
    if (err) return response.status(500).json({ message: "Something went wrong." });

    const { profile_image_url, uid, bio, email, username, password } = res.rows.length > 0 ? res.rows[0] : [];
    if (!username) return response.status(200).json({ error: true, message: "Invalid username or password." });

    bcrypt.compare(userEnteredPassword, password, (_, matched) => {
      if (!matched) return response.status(200).json({ error: true, message: "Invalid username or password." });
      const token = jwt.sign({ email, uid }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
      return response.status(200).json({ profile_image_url, uid, username, bio, email, token });
    });
  });
});

router.post("/signup", (request, response) => {
  const { email, username, password } = request.body;
  const query = `SELECT username FROM users WHERE username='${username}'`;

  db.query(query, (err, res) => {
    if (res.rowCount > 0 || err) return response.status(200).json({ error: true, message: "Username already taken." });

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return response.status(500).json({ error: true, message: "Something went wrong." });

      const addNewUserQuery = `INSERT INTO users(email,username,password,joined_date,profile_image_url)
      VALUES('${email}','${username}','${hash}','${new Date()}','https://bit.ly/3dPEtHZ')`;
      db.query(addNewUserQuery, (err, _) => {
        if (err) return response.status(500).json({ error: true, message: "Something went wrong." });
        return response.status(200).json({ message: "Succesfully created the new user." });
      });
    });
  });
});

module.exports = router;
