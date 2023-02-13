const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const Database = require("./database");

const app = express();
const PORThttps = process.env.PORT || 3000;
const PORThttp = 80;

const db = new Database();

var privateKey = fs.readFileSync("server.key", "utf8");
var certificate = fs.readFileSync("server.crt", "utf8");

var credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: "tbhhsy78",
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/allUsers", async (req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  try {
    const results = await db.query("SELECT * FROM users");
    res.send(JSON.stringify(results));
  } catch (error) {
    res.send(error.message);
  }
});

const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

httpsServer.listen(PORThttps, () => {
  console.log(`HTTPS Server running on port ${PORThttps}`);
});

httpServer.listen(PORThttp, () => {
  console.log(`HTTP Server running on port ${PORThttp}`);
});

process.on("SIGINT", async () => {
  console.log("Closing database connection");
  await db.close();
  process.exit();
});
