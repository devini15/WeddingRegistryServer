export default {
  async fetch(request) {
    const url = "https://script.google.com/macros/s/AKfycbzCh51QFqE_xgWjMLZnI3_XhdvjMXWvDYmhrCgkDyPDO7sk6nI7q-K1oHoXbAfsSF6h/exec";

    const body = await request.json(); // Parse incoming JSON request

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body)
    });

    return new Response(await response.text(), {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
};
