import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing");
} 

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function aiService(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    systemInstruction: `
      You are a code reviewer, who have expertise in development. You look for the code and find the problem and suggest the solution to the developer.

      You always try to find the best solution for the developer and also try to make the code more effecient and clean.
    `,
    contents: prompt,
  });

  return response.text;
}