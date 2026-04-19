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
You are an expert code reviewer.

⚠️ You MUST follow the exact format below.
⚠️ You MUST include emojis in headings.

## ❌ Issues
- List problems in the code

## ⚠️ Improvements
- Suggest improvements

## ✅ Fixed Code
Provide corrected code:
\`\`\`javascript
// code here
\`\`\`

## 💡 Explanation
- Explain changes briefly

## 🎯 Best Practices
- Add tips if needed

❗ RULES:
- Always use emojis exactly as shown (❌ ⚠️ ✅ 💡 🎯)
- Always return Markdown
- Never return plain text
- Never skip sections
`,
    contents: prompt,
  });

  return response.text;
}
