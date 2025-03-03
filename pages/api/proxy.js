// This is a serverless function that runs on Vercel.
// It acts as a proxy that forwards requests from our React component
// to the zerowidth API endpoint.
// Verbose comments are included to help beginners understand the flow.

// Import the chat configuration settings.
import chatConfig from "../../config/config";

export default async function handler(req, res) {
  // Set CORS headers so that our React frontend can communicate with this API.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight OPTIONS request.
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get the request body sent by the React component.
  const requestBody = req.body;

  try {
    //the url is in the config file
    const apiUrl = chatConfig.flowURL;

    //the bearer token is stored in the environment variable
    const bearerToken = process.env.ZEROWIDTH_API_KEY;

    // Forward the request to the zerowidth API endpoint using the fetch API.
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    // If the zerowidth API returns an error status, capture its message.
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Zerowidth API error ${response.status}: ${errorText}`);
    }

    // Parse the JSON response from zerowidth.
    const data = await response.json();

    // Send the zerowidth API response back to the React component.
    res.status(200).json(data);
  } catch (error) {
    // Log the error for debugging purposes.
    console.error("Error in proxy function:", error);
    // Return a generic error response with details.
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
