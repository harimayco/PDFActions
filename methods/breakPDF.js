import { createPDF, pdfArrayToBlob, breakPDF, zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const breakPDFHandler = async (files, asZip = true, options = {}) => {
  if (!files || files.length === 0) return;
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  const item = files[0];
  const rawFile = item.file || item;
  const maxPages = options.maxPages || item.breakPDFMaxPages || 1;
  const includeLastPages =
    options.includeLastPages !== undefined
      ? options.includeLastPages
      : item.breakPDFIncludeLastPages !== false;
  const degrees = item.degrees || 0;

  const pdfFile = await createPDF.PDFDocumentFromFile(rawFile);
  const docsFile = await breakPDF(
    pdfFile,
    maxPages,
    includeLastPages,
    degrees
  );

  const baseName = item.name || rawFile.name || "document.pdf";

  for (let i = 0; i < docsFile.length; i++) {
    const docArray = await docsFile[i].save();

    if (asZip) {
      zip.file(`break-${i + 1}-${baseName}`, docArray);
    } else {
      const pdfBlob = pdfArrayToBlob(docArray);
      saveAs(pdfBlob, `break-${i + 1}-${baseName}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "breakPDFFiles.zip");
  }
};

export default breakPDFHandler;
