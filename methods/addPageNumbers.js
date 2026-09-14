import { saveAs } from "file-saver";
import { addPageNumbers, createPDF, pdfArrayToBlob } from "pdf-actions";

const addPageNumbersHandler = async (files, options = {}) => {
  if (!files || files.length === 0) return;
  const item = files[0];
  const rawFile = item.file || item;

  const position = options.position || item.pageNumberPosition || "b-c";
  const margin = options.margin || item.margin || "Recommended";
  const startingPage = options.startingPage || item.startingPage || 1;
  const endingPage = options.endingPage || item.endingPage || item.pageCount || 1;
  const firstPageNumber = options.firstPageNumber || item.firstPageNumber || 1;
  const fontSize = options.fontSize || item.pageNumberFontSize || 12;

  const pdfDoc = await createPDF.PDFDocumentFromFile(rawFile);
  const pdfFile = await addPageNumbers(
    pdfDoc,
    position,
    margin,
    startingPage,
    endingPage,
    firstPageNumber,
    fontSize
  );
  const pdfArray = await pdfFile.save();
  const pdfBlob = pdfArrayToBlob(pdfArray);
  const fileName = item.name || rawFile.name || "numbered.pdf";
  saveAs(pdfBlob, `pageNumber-${fileName}`);
};

export default addPageNumbersHandler;
