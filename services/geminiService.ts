import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, PracticeExample, MathContextResult } from '../types';
import { FactoringCase, Language } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    tipo: { 
      type: Type.STRING, 
      description: 'The identified factoring case type. If none, "Unknown Case".' 
    },
    esValido: { 
      type: Type.BOOLEAN, 
      description: 'True if the expression corresponds to one of the factoring cases, false otherwise.' 
    },
    pasos: {
      type: Type.ARRAY,
      description: 'A list of detailed steps to solve the factoring.',
      items: {
        type: Type.OBJECT,
        properties: {
          paso: { type: Type.STRING, description: 'A short descriptive title for the step.' },
          descripcion: { type: Type.STRING, description: 'Detailed explanation of what is done in this step.' }
        },
        required: ['paso', 'descripcion']
      }
    },
    resultado: { 
      type: Type.STRING, 
      description: 'The final fully factored expression. Use the ^ symbol for exponents. Ex: (x + 2)(x - 2).' 
    },
    explicacionMetodo: { 
      type: Type.STRING, 
      description: 'A very short and simple explanation (1-2 sentences) of the factoring method used, or why it cannot be factored.' 
    }
  },
  required: ['tipo', 'esValido', 'pasos', 'resultado', 'explicacionMetodo']
};

const exampleSchema = {
    type: Type.OBJECT,
    properties: {
        problema: {
            type: Type.STRING,
            description: "A simple example exercise for the requested factoring case. Use ^ for exponents. Ex: x^2 - 9."
        },
        resultado: {
            type: Type.STRING,
            description: "The factored solution for the example problem. Use ^ for exponents. Ex: (x - 3)(x + 3)."
        }
    },
    required: ['problema', 'resultado']
};

const contextSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A short, catchy title for the fact or historical context."
    },
    content: {
      type: Type.STRING,
      description: "A paragraph (2-3 sentences) explaining a historical fact, a real-world application, or a cultural note about algebra, polynomials, or famous mathematicians."
    }
  },
  required: ['title', 'content']
};

export const analyzeExpression = async (expression: string, caseType: FactoringCase, language: Language): Promise<AnalysisResult> => {
    const langInstruction = language === 'es' 
        ? "Responde TODO en Español." 
        : "Respond EVERYTHING in English.";

    let prompt;
    if (caseType === FactoringCase.AUTO_DETECT) {
      prompt = `
        Analiza la siguiente expresión algebraica: "${expression}".
        1. Identifica si corresponde a uno de los siguientes casos de factoreo: Factor Común, Diferencia de Cuadrados, Trinomio Cuadrado Perfecto, o Trinomio de la forma x² + bx + c.
        2. Si corresponde a uno de los casos, proporciona una solución detallada paso a paso.
        3. Muestra la expresión final factorizada.
        4. Explica la teoría detrás del método de factoreo utilizado de forma muy breve y sencilla, en 1 o 2 frases como máximo.
        5. Si la expresión no corresponde a ninguno de estos casos o es muy compleja, indícalo claramente y explica de forma sencilla por qué.
        6. Usa el símbolo ^ para los exponentes (ej. x^2).
        7. ${langInstruction}
      `;
    } else {
      prompt = `
        Analiza si la expresión algebraica "${expression}" se puede resolver usando el método de "${caseType}".
        1. Confirma si la expresión es un ejemplo válido de este caso.
        2. Si lo es, proporciona una solución detallada paso a paso para este método específico.
        3. Muestra la expresión final factorizada usando este método.
        4. Explica por qué el método "${caseType}" es aplicable aquí de forma muy breve y sencilla, en 1 o 2 frases como máximo.
        5. Si la expresión NO corresponde a este caso, explica claramente y de forma sencilla por qué no se puede aplicar este método y establece 'esValido' en 'false'.
        6. Usa el símbolo ^ para los exponentes (ej. x^2).
        7. ${langInstruction}
      `;
    }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.3,
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API for analysis:", error);
    throw new Error("Failed to analyze expression with Gemini API.");
  }
};


export const generateExample = async (caseType: FactoringCase, language: Language): Promise<PracticeExample> => {
    const langInstruction = language === 'es' 
        ? "Responde en Español." 
        : "Respond in English.";

    const prompt = `
      Genera un ejemplo simple y claro de un ejercicio de factoreo para el caso: "${caseType}".
      - El problema debe ser fácil de entender para un estudiante.
      - Proporciona tanto el problema como su solución factorizada.
      - Usa el símbolo ^ para los exponentes (ej. x^2).
      - ${langInstruction}
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: exampleSchema,
          temperature: 0.8,
        },
      });
      
      const jsonText = response.text.trim();
      return JSON.parse(jsonText) as PracticeExample;

    } catch (error) {
      console.error("Error calling Gemini API for example generation:", error);
      throw new Error("Failed to generate example with Gemini API.");
    }
  };

export const getMathContext = async (language: Language): Promise<MathContextResult> => {
  const langInstruction = language === 'es' 
      ? "Responde en Español." 
      : "Respond in English.";

  // List of distinct topics to ensure variety
  const topics = [
    "Ancient Babylonian or Egyptian mathematics",
    "Modern cryptography and prime numbers",
    "The Golden Ratio or Fibonacci sequence in nature",
    "Women in mathematics history (e.g., Hypatia, Ada Lovelace, Emmy Noether)",
    "Unsolved mathematical problems or paradoxes",
    "The origin of mathematical symbols (like x, =, zero)",
    "Fractals and Chaos Theory",
    "Math in architecture or art",
    "Strange properties of specific numbers (like Pi, e, or imaginary numbers)",
    "The use of polynomials in computer graphics"
  ];

  // Pick a random topic
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `
    Tell me a surprising and interesting fact specifically about: "${randomTopic}".
    - Focus on something less known or curious related to mathematics.
    - Keep it short, engaging, and educational (max 3 sentences).
    - Do not simply define the term, give a 'fun fact'.
    - ${langInstruction}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contextSchema,
        temperature: 1.0, 
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as MathContextResult;

  } catch (error) {
    console.error("Error calling Gemini API for math context:", error);
    return {
      title: language === 'es' ? "¿Sabías que?" : "Did you know?",
      content: language === 'es' 
        ? "El álgebra proviene de la palabra árabe 'al-jabr', que significa 'reunión de partes rotas'. Es fundamental para resolver problemas en ingeniería, física y economía."
        : "Algebra comes from the Arabic word 'al-jabr', meaning 'reunion of broken parts'. It is fundamental for solving problems in engineering, physics, and economics."
    };
  }
};
