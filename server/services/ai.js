const axios = require("axios");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const generateResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", 
        messages: [
          { role: "system", content: "You are a professional fitness coach." },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Groq Error:", error.response?.data || error.message);
    return "⚠️ AI service unavailable";
  }
};

module.exports = { generateResponse };
