// api/rsvp.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const url =
    "https://script.google.com/macros/s/AKfycbylknpgC7fL7nZWd7ZdrjOStQNecRAY3P8T8R7V--goGd9mbx2HlPqwou9tqzeo_Ju8-Q/exec";

  try {
    // Validate request body
    const { name, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "Name is required",
      });
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name.trim(),
        message: message?.trim() || "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.text();
      res.status(200).json({
        success: true,
        message: "RSVP submitted successfully",
        data: data,
      });
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    res.status(500).json({
      success: false,
      error: "Error relaying RSVP to Google Sheets",
    });
  }
}
