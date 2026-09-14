import { saveAs } from "file-saver";
import JSZip from "jszip";
import { createPDF, pdfArrayToBlob, resizePDF, zipToBlob } from "pdf-actions";

const resizePDFHandler = async (files, options = {}, asZip = true) => {
  // If third param is boolean or options was passed as boolean
  let isZip = asZip;
  let config = options;
  if (typeof options === "boolean") {
    isZip = options;
    config = {};
  }

  const resizeSize =
    config.size ||
    (typeof document !== "undefined" ? document.getElementById("resizeSize")?.value : "A4") ||
    "A4";
  const orientation =
    config.orientation ||
    (typeof document !== "undefined" ? document.getElementById("orientation")?.value : "Portrait") ||
    "Portrait";
  const position =
    config.position ||
    (typeof document !== "undefined" ? document.getElementById("position")?.value : "Center") ||
    "Center";

  let zip;
  if (isZip) {
    zip = new JSZip();
  }

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item.deleted) continue;

    const rawFile = item.file || item;
    const degrees = item.degrees || 0;

    const pdfDocument = await createPDF.PDFDocumentFromFile(rawFile);
    const resizedPDF = await resizePDF(
      pdfDocument,
      resizeSize,
      orientation,
      position,
      degrees
    );
    const pdfFile = await resizedPDF.save();
    const fileName = item.name || rawFile.name || `document-${i + 1}.pdf`;

    if (isZip) {
      zip.file(`resized-${fileName}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `resized-${fileName}`);
    }
  }

  if (isZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "resizedPDFFiles.zip");
  }
};

export default resizePDFHandler;
