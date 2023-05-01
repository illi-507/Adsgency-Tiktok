const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/term_of_service", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/privacy_policy", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const SERVER_ENDPOINT_REDIRECT =
  "https://bighammer-adsgency123/authCallback";


const CLIENT_KEY = "aw4zquvz52bvbya3";
app.get("/oauth", (req, res) => {
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie("csrfState", csrfState, { maxAge: 60000 });

  let url = "https://www.tiktok.com/auth/authorize/";

  url += `?client_key=${CLIENT_KEY}`;
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += `&redirect_uri=${encodeURIComponent(SERVER_ENDPOINT_REDIRECT)}`;
  url += "&state=" + csrfState;

  res.redirect(url);
});
app.post("/authCallback", (req, res) => {
  console.log(req.body);
  res.send(200);
});

server.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
