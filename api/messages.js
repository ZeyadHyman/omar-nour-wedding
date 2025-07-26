export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const url =
    "https://script.google.com/macros/s/AKfycbzXvlC_X1X7u6IsJnKBX0uYurp1-iS3MFjxbioiwwVb3DsKS9SW4dGSfs608FSs6gqbnQ/exec";

  try {
    // Add a parameter to indicate we want to read messages
    const response = await fetch(`${url}?action=read`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.text();

      // Try to parse as JSON first
      let messages = [];
      try {
        const jsonData = JSON.parse(data);
        messages = jsonData.messages || [];
      } catch (parseError) {
        // If not JSON, return empty array for now
        console.log("Response is not JSON, returning empty messages array");
      }

      res.status(200).json({
        success: true,
        messages: messages,
        count: messages.length,
      });
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      error: "Error fetching messages",
      messages: [], // Return empty array as fallback
      count: 0,
    });
  }
}
