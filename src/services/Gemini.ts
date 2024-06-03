import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const getResponseGemini = async (prompt: string): Promise<string | Error> => {
  if (!process.env.API_KEY) return new Error("Chave da API não encontrada!");
  
  try {
    const genAi = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;    

    return response.text();
  } catch (error) {
    return new Error(`Erro ao tentar realizar a solicitação à API: ${error}`);
  }
};

export { getResponseGemini };
