// api/rsvp.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const url =
    "https://script.google.com/macros/s/AKfycbylknpgC7fL7nZWd7ZdrjOStQNecRAY3P8T8R7V--goGd9mbx2HlPqwou9tqzeo_Ju8-Q/exec";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.text();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error relaying RSVP" });
  }
}
