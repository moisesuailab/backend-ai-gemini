"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseGemini = void 0;
const generative_ai_1 = require("@google/generative-ai");
const getResponseGemini = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.API_KEY)
        return new Error("Chave da API não encontrada!");
    try {
        const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.API_KEY);
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = yield model.generateContent(prompt);
        const response = result.response;
        return response.text();
    }
    catch (error) {
        return new Error(`Erro ao tentar realizar a solicitação à API: ${error}`);
    }
});
exports.getResponseGemini = getResponseGemini;
