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
exports.router = void 0;
const express_1 = require("express");
const services_1 = require("../../services");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    return res.send("IA Generativa!");
});
router.post("/chat/completions", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const result = yield (0, services_1.getResponseGemini)(prompt);
    if (result instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(result);
}));
router.post("/generate-pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { htmlContent } = req.body;
    if (!htmlContent) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "O conteúdo HTML não foi informado!",
            },
        });
    }
    const pdfBuffer = yield (0, services_1.generatePDF)(htmlContent);
    if (pdfBuffer instanceof Error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: pdfBuffer.message,
            },
        });
    }
    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="documento.pdf"');
    return res.status(http_status_codes_1.StatusCodes.OK).send(pdfBuffer);
}));
