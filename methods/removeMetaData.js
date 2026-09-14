import { saveAs } from "file-saver";
import { createPDF, removeMetaData, pdfArrayToBlob } from "pdf-actions";

const removeMetaDataHandler = async (files) => {
  if (!files || files.length === 0) return;
  const item = files[0];
  const rawFile = item.file || item;

  const pdfDocument = await createPDF.PDFDocumentFromFile(rawFile);
  const newPDF = await removeMetaData(pdfDocument);
  const pdfFile = await newPDF.save();
  const pdfBlob = pdfArrayToBlob(pdfFile);
  const fileName = item.name || rawFile.name || "metadata-removed.pdf";
  saveAs(pdfBlob, fileName);
};

export default removeMetaDataHandler;
