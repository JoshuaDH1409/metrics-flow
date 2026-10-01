const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;

// Initialize SDK if key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

module.exports = ai;
