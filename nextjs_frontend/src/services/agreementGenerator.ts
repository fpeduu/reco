import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { DevedorAcordo } from "@/types/acordo.dto";

async function generateAgreement(devedor: DevedorAcordo) {
  const pdfDoc = await PDFDocument.create();
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const leftSpace = 30;
  const rightSpace = 15;
  let lastLineHeight = height;

  // Title
  const fontSize = 11;
  const title = "Termo de acordo e confissão de dívida";

  lastLineHeight -= 50;
  page.drawText(title, {
    x: leftSpace,
    y: lastLineHeight,
    size: 16,
    font: timesBoldFont,
    color: rgb(0, 0, 0)
  });

  const { acordo } = devedor;
  if (!acordo.dataAtualizacao) {
    acordo.dataAtualizacao = new Date();
  }

  const acordoDateString = new Date(acordo.dataAtualizacao).toLocaleDateString("pt-br");

  // Header
  lastLineHeight -= 50;
  page.drawText("Acordo", {
    x: leftSpace,
    y: lastLineHeight,
    size: 12,
    font: timesBoldFont,
    color: rgb(1, 0, 0)
  });

  lastLineHeight -= 20;
  page.drawText("Detalhes", {
    x: leftSpace + 2,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0.5, 0.5, 0.5)
  });

  lastLineHeight -= 5;
  page.drawLine({
    start: { x: leftSpace, y: lastLineHeight },
    end: {
      x: width - rightSpace,
      y: lastLineHeight
    }
  });

  const details = `
Unidade:-
Cod. acordo:-
Efetuado em:${acordoDateString}
Condômino(Proprietário):${devedor.nome}  CPF/CNPJ: ${devedor.cpf}
                    -
    
Condomínio:${devedor.nomeCondominio}
                    -
                    CNPJ: -`;

  const detailsLines = details.split("\n");
  for (let i = 0; i < detailsLines.length; i++) {
    const line = detailsLines[i];
    const separator = line.indexOf(":");
    const section = line[0] !== " " ? line.slice(0, separator + 1) : "";
    const sectionContent = line[0] === " " ? line.trim() : line.slice(separator + 1);

    if (i > 0 && i % 2 === 0) {
      page.drawRectangle({
        x: leftSpace,
        y: lastLineHeight - 4,
        width: width - leftSpace - rightSpace,
        height: 14,
        color: rgb(0.7, 0.7, 0.7),
        opacity: 0.2
      });
    }

    page.drawText(section, {
      x: leftSpace + 2,
      y: lastLineHeight,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      lineHeight: 12
    });
    page.drawText(sectionContent, {
      x: leftSpace + 150,
      y: lastLineHeight,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      lineHeight: 12
    });

    lastLineHeight -= 14;
  }

  lastLineHeight += 10;
  page.drawLine({
    start: { x: leftSpace, y: lastLineHeight },
    end: {
      x: width - rightSpace,
      y: lastLineHeight
    }
  });

  // Content 1
  const content = `Pelo presente instrumento de confissão de dívida as partes acima qualificadas, independente de seu número e gênero, têm
por justo, líquido, certo e exigível, obrigando a si e seus sucessores, de maneira irrevogável o seguinte: O CONDÔMINO
reconhece ser devedor dos valores abaixo registrados, dando por líquido, certo e exigíveis.`;

  lastLineHeight -= 25;
  page.drawText(content, {
    x: leftSpace,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    lineHeight: 12
  });
  lastLineHeight -= 12 * content.split("\n").length;

  lastLineHeight -= 30;
  page.drawLine({
    start: { x: leftSpace + 10, y: lastLineHeight },
    end: { x: leftSpace + 180, y: lastLineHeight }
  });
  page.drawLine({
    start: { x: leftSpace + 240, y: lastLineHeight },
    end: { x: leftSpace + 410, y: lastLineHeight }
  });

  lastLineHeight -= 14;
  page.drawText("Condomínio", {
    x: leftSpace + 65,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0)
  });
  page.drawText("Condômino", {
    x: leftSpace + 300,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0)
  });

  // Content 2
  const content2 = `Os pagamentos deverão ser efetuados através de boletos bancários fornecidos pela administradora.
O não pagamento de qualquer das parcelas, neste, acordadas, considerar-se-á vencidas antecipadamente a dívida com multa
de 2% e juros 1% ao mês.

Fica, desde já, acordado que as taxas de condomínio vincendas, se não pagas, poderão ensejar quebra deste acordo, podendo
a administradora encaminhar o débito ao departamento jurídico para que seja exercida a cobrança judicial dos valores.`;

  lastLineHeight -= 25;
  page.drawText(content2, {
    x: leftSpace,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    lineHeight: 12
  });
  lastLineHeight -= 12 * content2.split("\n").length;

  // Content 3
  const content3 = `Cumprida a obrigação, o CONDOMÍNIO ${devedor.nomeCondominio} dará plena, geral e irrevogável quitação de todo objeto da presente demanda.`;
  let firstLine = "";
  let secondLine = "";
  const content3Words = content3.split(" ");
  for (const word of content3Words) {
    if (secondLine.length === 0 && firstLine.length + word.length <= 115) {
      firstLine += word + " ";
      continue;
    }
    secondLine += word + " ";
  }
  const formattedContent3 = firstLine + "\n" + secondLine;

  lastLineHeight -= 12;
  page.drawText(formattedContent3, {
    x: leftSpace,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    lineHeight: 12
  });
  lastLineHeight -= 12 * formattedContent3.split("\n").length;

  // Content 4
  const content4 = `FIRMO O PRESENTE COMPROMISSO DE PAGAMENTO DO VALOR SUPRA MENCIONADO CONFORME RESUMO ABAIXO:`;

  lastLineHeight -= 12;
  page.drawText(content4, {
    x: leftSpace,
    y: lastLineHeight,
    size: fontSize - 1.2,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
    lineHeight: 12
  });
  lastLineHeight -= 12 * content4.split("\n").length;

  lastLineHeight -= 30;
  page.drawLine({
    start: { x: leftSpace, y: lastLineHeight },
    end: { x: leftSpace + 180, y: lastLineHeight }
  });

  lastLineHeight -= 14;
  page.drawText(devedor.nome, {
    x: leftSpace,
    y: lastLineHeight,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0)
  });

  // Logo Reco
  const imageBytes = await fetch("/reco.png").then((response) => response.arrayBuffer());
  const image = await pdfDoc.embedPng(imageBytes);
  const imageDims = image.scale(0.1);

  page.drawImage(image, {
    x: width - imageDims.width - 10,
    y: 10,
    width: imageDims.width,
    height: imageDims.height
  });

  return await pdfDoc.save();
}

export async function downloadAgreement(acordo: DevedorAcordo) {
  const pdfBytes = await generateAgreement(acordo);
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  if (typeof window !== "undefined") {
    link.href = window.URL.createObjectURL(blob);
    link.download = `acordo_${acordo.cpf}.pdf`;
    link.click();
  }
}
