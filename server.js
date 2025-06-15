// server.js
const express = require("express");
const cors = require("cors");
const { fetch } = require("undici");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCh51QFqE_xgWjMLZnI3_XhdvjMXWvDYmhrCgkDyPDO7sk6nI7q-K1oHoXbAfsSF6h/exec";

// Forward POST requests to Google Apps Script
app.post("/purchase", async (req, res) => {
  console.log("Received request at proxy:", req.body); // Log incoming request

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body) // Forward the request body properly
    });

    const text = await response.text();
    console.log("Response from Google Script:", text); // Log script response
    res.send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy failed: " + err.message);
  }
});


app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});
