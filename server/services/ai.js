const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateResponse = async (prompt) => {
  const start = Date.now();

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        model: "gemini-3.5-flash-lite",
        messages: [
          {
            role: "system",
            content:
              "You are a fitness coach. Give concise, practical, safe advice. Use the provided workout context. Avoid unnecessary introductions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 250,
        extra_body: {
          google: {
            thinking_config: {
              thinking_level: "low"
            }
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    console.log(
      `AI response time: ${Date.now() - start} ms`
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Gemini API error:",
      error.response?.data || error.message
    );

    return "AI service is temporarily unavailable. Please try again.";
  }
};

module.exports = { generateResponse };
