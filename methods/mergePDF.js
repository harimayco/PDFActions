import { createPDF, rotatePDF, pdfArrayToBlob, mergePDF, resizePDF } from "pdf-actions";
import { saveAs } from "file-saver";

const mergePDFHandler = async (files) => {

  const resizeSize = document.getElementById("resizeSize").value;
  const orientation = document.getElementById("orientation").value;
  const position = document.getElementById("position").value;
  const sameSize =  document.getElementById("sameSize").checked;

  const pdfDocs = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }

    let pdfFile = await createPDF.PDFDocumentFromFile(file);
    let pdfToBeAdded;

    if (sameSize) {
      const resizedPDF = await resizePDF(
        pdfFile,
        resizeSize,
        orientation,
        position
      );
      pdfToBeAdded = resizedPDF;
    } else {
      pdfToBeAdded = pdfFile;
    }

    if (file.degrees) {
      pdfToBeAdded = await rotatePDF(pdfToBeAdded, file.degrees);
    }
    
    
    pdfDocs.push(pdfToBeAdded);
  }
  const mergedPdfFile = await (await mergePDF(pdfDocs)).save();
  const pdfBlob = pdfArrayToBlob(mergedPdfFile);
  saveAs(pdfBlob, "merged.pdf");
};

export default mergePDFHandler;
