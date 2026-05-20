import { useState } from 'react';

export function useGeminiAI() {
  const [wasteInput, setWasteInput] = useState('');
  const [base64Image, setBase64Image] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  const [challengeCategory, setChallengeCategory] = useState('Cafeteria');
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [challengeResult, setChallengeResult] = useState(null);
  const [challengeError, setChallengeError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setBase64Image(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  };

  const callGeminiBase = async (payload, retries = 5, delay = 1000) => {
    const apiKey = "AIzaSyD0bIEy6aliAgeDldeaDpi6w_j-c0CZOGA"; 
    
    const modelName = apiKey ? "gemini-2.5-flash" : "gemini-2.5-flash-preview-09-2025";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        if (response.status === 403 || response.status === 400 || response.status === 404) {
           throw new Error("Missing or Invalid API Key. Si estás en VS Code, por favor pega tu clave en la variable apiKey del código.");
        }
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
      
      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textResponse) throw new Error("Respuesta vacía de la Inteligencia Artificial.");
      return JSON.parse(textResponse);
    } catch (error) {
      if (retries > 0 && !error.message.includes("Missing or Invalid API Key")) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiBase(payload, retries - 1, delay * 2);
      }
      throw error;
    }
  };

  const callGeminiAPI = async () => {
    if (!wasteInput.trim() && !base64Image) {
      setAiError("Please type an item name or upload a photo.");
      return;
    }
    setAiLoading(true); setAiResult(null); setAiError(null);
    const systemPrompt = `You are an advanced recycling AI assistant for an environmental campaign called "Think Before You Throw". Your job is to classify the user's waste item strictly according to the campaign's 3 bins: 1. "White": Clean and dry plastic, glass, metal, paper, and cardboard. 2. "Black": Non-recyclable trash like dirty napkins, food wrappers. 3. "Green": Organic waste like food scraps. You MUST respond strictly in JSON format. { "bin": "White" | "Black" | "Green", "binName": "The White Bin" | "The Black Bin" | "The Green Bin", "actionRequired": "A2 level english action", "explanation": "A2 level english explanation", "funEcoFact": "A2 level english eco fact" }`;
    const userQuery = wasteInput.trim() ? `Please classify this item: "${wasteInput}"` : "Please classify the item shown in this image.";
    const contentsParts = [];
    if (base64Image) contentsParts.push({ inlineData: { mimeType: "image/png", data: base64Image } });
    contentsParts.push({ text: userQuery });

    const payload = {
      contents: [{ parts: contentsParts }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { bin: { type: "STRING" }, binName: { type: "STRING" }, actionRequired: { type: "STRING" }, explanation: { type: "STRING" }, funEcoFact: { type: "STRING" } }, required: ["bin", "binName", "actionRequired", "explanation", "funEcoFact"] } }
    };
    try { 
      setAiResult(await callGeminiBase(payload)); 
    } catch (err) { 
      setAiError(err.message || "Oops! We couldn't analyze your waste right now. Please try again."); 
    } finally { 
      setAiLoading(false); 
    }
  };

  const generateEcoChallenge = async () => {
    setChallengeLoading(true); setChallengeResult(null); setChallengeError(null);
    const systemPrompt = `You are an advanced eco-challenge generator for a university campaign. Respond in JSON. { "challengeTitle": "A2 level English title", "mission": "A2 level English mission", "impact": "A2 level English impact", "motivation": "A2 level English motivation quote" }`;
    const userQuery = `Generate a personalized daily eco-challenge for the category: "${challengeCategory}" on our university campus.`;
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { challengeTitle: { type: "STRING" }, mission: { type: "STRING" }, impact: { type: "STRING" }, motivation: { type: "STRING" } }, required: ["challengeTitle", "mission", "impact", "motivation"] } }
    };
    try { 
      setChallengeResult(await callGeminiBase(payload)); 
    } catch (err) { 
      setChallengeError(err.message || "Oops! We couldn't generate your challenge right now. Please try again."); 
    } finally { 
      setChallengeLoading(false); 
    }
  };

  return {
    wasteInput, setWasteInput,
    base64Image, setBase64Image,
    imageFileName, setImageFileName,
    aiLoading, setAiLoading,
    aiResult, setAiResult,
    aiError, setAiError,
    challengeCategory, setChallengeCategory,
    challengeLoading, setChallengeLoading,
    challengeResult, setChallengeResult,
    challengeError, setChallengeError,
    handleImageUpload,
    callGeminiAPI,
    generateEcoChallenge
  };
}
