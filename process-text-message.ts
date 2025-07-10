import { GoogleGenerativeAI } from "@google/generative-ai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("ERROR: Gemini API Key Is not defined!");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function analyzeMessage(message: string) {
  const prompt = `Fact-check the following information and state whether it is true, false, or requires more context. Provide a brief explanation for your answer.
    In two or three consise straight to point informal speach
    Information: "${message}"`;

  try {
    const result = await model.generateContent(prompt);
    return { message: result.response.text(), success: true };
  } catch (error) {
    return {
      message: "ERROR: Something went wrong with AI Model Please try again",
      success: false,
    };
  }
}
