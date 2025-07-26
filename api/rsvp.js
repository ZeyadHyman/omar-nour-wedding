export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const url =
    "https://script.google.com/macros/s/AKfycbzXvlC_X1X7u6IsJnKBX0uYurp1-iS3MFjxbioiwwVb3DsKS9SW4dGSfs608FSs6gqbnQ/exec";

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
