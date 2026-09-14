import {
  createPDF,
  pdfArrayToBlob,
  flattenPDFForm,
  zipToBlob,
  rotatePDF,
} from "pdf-actions";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const flattenPDFFormHandler = async (files, asZip = true) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item.deleted) continue;

    const rawFile = item.file || item;
    const degrees = item.degrees || 0;

    const pdfFile = await createPDF.PDFDocumentFromFile(rawFile);
    let flattenFormPDF = await flattenPDFForm(pdfFile);

    if (degrees) {
      flattenFormPDF = await rotatePDF(flattenFormPDF, degrees);
    }

    const fileArray = await flattenFormPDF.save();
    const fileName = item.name || rawFile.name || `flattened-${i + 1}.pdf`;

    if (asZip) {
      zip.file(`flatten-${fileName}`, fileArray);
    } else {
      const pdfBlob = pdfArrayToBlob(fileArray);
      saveAs(pdfBlob, `flatten-${fileName}`);
    }
  }

  if (asZip) {
    const zipBlob = await zipToBlob(zip);
    saveAs(zipBlob, "flattenedPDFFiles.zip");
  }
};

export default flattenPDFFormHandler;
