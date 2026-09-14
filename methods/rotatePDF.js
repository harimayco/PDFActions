import { createPDF, rotatePDF, zipToBlob, pdfArrayToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const rotatePDFHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item.deleted) continue;

    const rawFile = item.file || item;
    const degrees = item.degrees || 0;

    const pdfDoc = await createPDF.PDFDocumentFromFile(rawFile);
    const rotatedPDF = await rotatePDF(pdfDoc, degrees);
    const pdfFile = await rotatedPDF.save();
    const fileName = item.name || rawFile.name || `rotated-${i + 1}.pdf`;

    if (asZip) {
      zip.file(`rotated-${fileName}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `rotated-${fileName}`);
    }
  }

  if (asZip) {
    saveAs(await zipToBlob(zip), "rotatedPDFFiles.zip");
  }
};

export default rotatePDFHandler;
