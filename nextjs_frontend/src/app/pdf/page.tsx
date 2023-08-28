"use client";

import { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { serverURL } from "@/config";

export default function PdfPage() {
  const [pdfBytes, setPdfBytes] = useState<Uint8Array>();

  async function createPdf() {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;
    page.drawText("Creating PDFs in JavaScript is awesome!", {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();

    setPdfBytes(pdfBytes);
  }

  useEffect(() => {
    createPdf();
  }, []);

  useEffect(() => {
    if (pdfBytes) {
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      const pdfUrl = URL.createObjectURL(pdfBlob);

      const newWindow = window.open(pdfUrl, "_blank");

      return () => {
        URL.revokeObjectURL(pdfUrl);
        newWindow?.close();
      };
    }
  }, [pdfBytes]);

  return <div></div>;
}
