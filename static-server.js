/* eslint-disable */
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 5000;
const distDir = path.join(__dirname, "dist");

const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0];
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(distDir, decodeURIComponent(reqPath));
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // fallback to index.html for SPA
      const fallback = path.join(distDir, "index.html");
      fs.createReadStream(fallback).pipe(res);
      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;
      return;
    }
    const ext = path.extname(filePath);
    res.setHeader("Content-Type", mime[ext] || "application/octet-stream");
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, () =>
  console.log(`Static server running on http://localhost:${port}`)
);
