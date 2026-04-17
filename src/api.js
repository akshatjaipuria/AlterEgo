import { GoogleGenAI, Type } from "@google/genai";

export const fetchCouncil = async (situation) => {
  const apiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Temporal anomaly detected! The Council refuses to assemble without their tribute. (Please add GEMINI_API_KEY to your .env file).");
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `Analyze the given situation. Dynamically identify the domain (e.g., Tech, Finance, Romance) and generate 5 distinct personas.
Constraints: Each response must be under 30 words, use heavy "In-Character" slang, and offer a specific piece of advice.
Persona 1-4: Iconic Titans of the relevant domain.
Persona 5: A complete mismatch or Chaotic Outlier (e.g. a toddler, a medieval knight, a caffeinated squirrel).
Provide a short 'intro' for each person describing who they are, an 'advice_quote' under 30 words, and 'reasoning' for their advice.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: situation,
      config: {
        systemInstruction: systemPrompt,
        temperature: 1.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            situation_analysis: { type: Type.STRING },
            council: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  name: { type: Type.STRING },
                  intro: { type: Type.STRING },
                  flavor: { type: Type.STRING },
                  advice_quote: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  is_wildcard: { type: Type.BOOLEAN }
                },
                required: ["id", "name", "intro", "flavor", "advice_quote", "reasoning", "is_wildcard"]
              }
            }
          },
          required: ["situation_analysis", "council"]
        }
      }
    });

    return JSON.parse(response.text);

  } catch (error) {
    console.error('Error in fetchCouncil:', error);
    throw error;
  }
};
