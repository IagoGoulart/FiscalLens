require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testar() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: "Responda apenas: Gemini funcionando!",
    });

    console.log(response.text);
  } catch (error) {
    console.error(error);
  }
}

testar();