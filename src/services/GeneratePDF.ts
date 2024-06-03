import puppeteer from "puppeteer";

const generatePDF = async (htmlContent: string): Promise<Buffer | Error> => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({ printBackground: true, format: 'A4' });

    await browser.close();

    return pdf;
  } catch (error) {
    return new Error(`Erro ao tentar gerar o PDF: ${error}`);
  }
}

export {generatePDF};