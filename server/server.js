const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

var privateKey = fs.readFileSync("server.key", "utf8");
var certificate = fs.readFileSync("server.crt", "utf8");

var credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: "tbhhsy78",
};

app.get("/all", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", " 3.2.1");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.send("Hello World");
});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log("server starting on port : " + PORT);
});
