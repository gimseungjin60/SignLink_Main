import { GoogleGenAI } from "@google/genai";

const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function translateSignToText(imageBase64: string): Promise<string> {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64,
      },
    };
    const textPart = {
      text: 'Analyze the single, clear sign language gesture in this image. Respond with only the translated word or short phrase. If it is not a clear sign language gesture or is ambiguous, respond with "No clear gesture detected."'
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    const text = response.text.trim();

    if (text.toLowerCase().includes("no clear gesture detected")) {
        return "";
    }
    
    return text;
  } catch (error) {
    console.error("Error translating sign to text:", error);
    return "Error: Could not translate gesture.";
  }
}

export async function translateTextToSign(text: string): Promise<string> {
  try {
    const prompt = `Describe in a single, clear, and concise sentence how to perform the sign for the following text: "${text}". Start the sentence with "To sign '${text}', you..."`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error translating text to sign:", error);
    return "Error: Could not get sign description.";
  }
}
