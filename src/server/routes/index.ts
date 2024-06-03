import { Router } from "express";
import { generatePDF, getResponseGemini } from "../../services";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  return res.send("IA Generativa!");
});

router.post("/chat/completions", async (req, res) => {
  const { prompt } = req.body;

  const result = await getResponseGemini(prompt);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
});

router.post("/generate-pdf", async (req, res) => {
  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O conteúdo HTML não foi informado!",
      },
    });
  }

  const pdfBuffer = await generatePDF(htmlContent);

  if (pdfBuffer instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: pdfBuffer.message,
      },
    });
  }

  res.contentType("application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="documento.pdf"');
  return res.status(StatusCodes.OK).send(pdfBuffer);
});

export { router };
