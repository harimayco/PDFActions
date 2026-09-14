import { createPDF, splitPDF, zipToBlob, pdfArrayToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const splitPDFHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item.deleted) continue;

    const rawFile = item.file || item;
    const splitRange = item.splitRange || [1, item.pageCount || 1];
    const degrees = item.degrees || 0;

    const pdfDocument = await createPDF.PDFDocumentFromFile(rawFile);
    const split = await splitPDF(pdfDocument, splitRange, degrees);

    if (typeof split === "string") {
      alert(`Error splitting ${rawFile.name}: ${split}`);
      continue;
    }

    const pdfFile = await split.save();
    const fileName = item.name || rawFile.name || `split-${i + 1}.pdf`;

    if (asZip) {
      zip.file(`split-${fileName}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `split-${fileName}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "splitPDFFiles.zip");
  }
};

export default splitPDFHandler;
