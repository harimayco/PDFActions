import {
  createPDF,
  pdfArrayToBlob,
  addMarginPDF,
  zipToBlob,
} from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const addMarginHandler = async (files, marginMillimeter = [0, 0, 0, 0], asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item.deleted) continue;

    const rawFile = item.file || item;
    const degrees = item.degrees || 0;

    const pdfDocument = await createPDF.PDFDocumentFromFile(rawFile);
    const addedMarginFile = await addMarginPDF(
      pdfDocument,
      marginMillimeter,
      degrees
    );
    const pdfFile = await addedMarginFile.save();
    const fileName = item.name || rawFile.name || `margin-${i + 1}.pdf`;

    if (asZip) {
      zip.file(`newMargin-${fileName}`, pdfFile);
    } else {
      const pdfBlob = pdfArrayToBlob(pdfFile);
      saveAs(pdfBlob, `newMargin-${fileName}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "newMarginPDFFiles.zip");
  }
};

export default addMarginHandler;
