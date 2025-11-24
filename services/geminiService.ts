import { GoogleGenAI, Chat } from "@google/genai";
import { Product } from '../types';

// In a real app, this comes from process.env.API_KEY
// For this demo, we gracefully handle missing keys by returning mock responses
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getImpulseAdvice = async (product: Product, cartTotal: number): Promise<string> => {
  if (!API_KEY) {
    return `Mock AI: Buying ${product.title}? In this economy? You've already spent £${cartTotal}. Maybe sleep on it.`;
  }

  try {
    const prompt = `
      You are a sarcastic, witty, British financial "Impulse Coach" for an e-commerce site called Shopaholics Inc.
      The user is looking at: ${product.title} which costs £${product.price}.
      Their current cart total is £${cartTotal}.
      Give them a short, funny, slightly judging 1-sentence nudge about whether they really need this.
      Don't be rude, just cheeky.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "AI is speechless at your spending habits.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My circuits are fried, but my judgement of your spending remains.";
  }
};

export const findDupeExplanation = async (original: Product, dupe: Product): Promise<string> => {
  if (!API_KEY) {
    return `Mock AI: The ${dupe.title} does basically the same thing for way less cash.`;
  }

  try {
    const prompt = `
      Compare these two products for a shopper.
      Expensive: ${original.title} (£${original.price}). Description: ${original.description}.
      Cheap Dupe: ${dupe.title} (£${dupe.price}). Description: ${dupe.description}.
      Write a 1-sentence persuasive argument why the cheap one is the smarter buy. Use British slang if appropriate.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Save money, buy the cheap one.";
  } catch (error) {
    return "Just trust me, it's a bargain.";
  }
};

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are the Shopaholics Inc. AI Assistant. You are helpful but sarcastic, witty, and British. You love to playfully judge people's spending habits, but you are also genuinely helpful with finding products and answering questions about the store. You hate processing returns.",
    },
  });
};
