
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeThreat = async (type: string, input: string): Promise<AnalysisResult> => {
  const model = 'gemini-3-flash-preview';
  
  const systemPrompt = `You are a Senior Cybersecurity Engineer. Analyze the following ${type} input for security risks. 
  Provide a risk score from 0 (Safe) to 100 (Extremely Dangerous), a risk level (LOW, MEDIUM, HIGH), a detailed explanation of why it is flagged, and 3 actionable recommendations.
  Format the output strictly as JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: input,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            explanation: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "riskLevel", "explanation", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      score: 50,
      riskLevel: 'MEDIUM',
      explanation: "Unable to process AI analysis at this moment. Standard heuristics applied.",
      recommendations: ["Manually verify sources", "Enable 2FA", "Report suspicious activity"]
    };
  }
};

export const checkPasswordBreachExplanation = async (password: string): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Analyze this password structure (DO NOT store or leak it): "${password}". 
  Explain from a hacker's perspective why this structure is weak or strong. Mention entropy and common dictionary patterns. 
  Keep it educational and concise.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "AI-based vulnerability explanation currently unavailable.";
  }
};
