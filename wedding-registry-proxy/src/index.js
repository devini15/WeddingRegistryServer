export default {
const express = require("express");
const cors = require("cors");
const { fetch } = require("undici");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  async fetch(request) {
    console.log("Received request:", request); // Logs the request

    try {
      const body = await request.json();
      console.log("Parsed request body:", body); // Logs parsed data

      const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(body)
      });

      return new Response(await response.text(), {
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
};
