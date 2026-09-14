import { saveAs } from "file-saver";
import { createPDF, editMetaData, pdfArrayToBlob } from "pdf-actions";

const editMetaDataHandler = async (files, metaDataOptions = {}) => {
  if (!files || files.length === 0) return;
  const item = files[0];
  const rawFile = item.file || item;

  const options = { ...metaDataOptions };
  if (options.documentCreationDate) {
    options.documentCreationDate = new Date(options.documentCreationDate);
  }
  if (options.documentModificationDate) {
    options.documentModificationDate = new Date(options.documentModificationDate);
  }

  const pdfDocument = await createPDF.PDFDocumentFromFile(rawFile);
  const newPDF = await editMetaData(pdfDocument, options);
  const pdfFile = await newPDF.save();
  const pdfBlob = pdfArrayToBlob(pdfFile);
  const fileName = item.name || rawFile.name || "metadata-edited.pdf";
  saveAs(pdfBlob, fileName);
};

export default editMetaDataHandler;
