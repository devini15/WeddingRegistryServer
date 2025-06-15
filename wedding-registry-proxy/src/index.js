export default {

  async fetch(request) {
    console.log("Received request:", request); // Logs the request

    try {
      const body = await request.json();
      console.log("Parsed request body:", body); // Logs parsed data

      const response = await fetch("https://script.google.com/macros/s/AKfycbzCh51QFqE_xgWjMLZnI3_XhdvjMXWvDYmhrCgkDyPDO7sk6nI7q-K1oHoXbAfsSF6h/exec", {
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
