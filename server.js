const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);

//routes
const post = require("./routes/post");
const user = require("./routes/user");

//redirection
app.use("/post", post);
app.use("/user", user);

//server running
server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
