import { createPDF, rotatePDF, pdfArrayToBlob, mergePDF, resizePDF } from "pdf-actions";
import { saveAs } from "file-saver";
import doCompress from  "./compressPDF";

const mergePDFHandler = async (files, filename) => {

  const resizeSize = document.getElementById("resizeSize").value;
  const orientation = document.getElementById("orientation").value;
  const position = document.getElementById("position").value;
  const sameSize =  document.getElementById("sameSize").checked;
  const compress =  document.getElementById("compressPDF").checked;

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

  let pdfBlob = pdfArrayToBlob(mergedPdfFile);
  
  if(compress){
    //blob to url
    const pdfURL = window.URL.createObjectURL(pdfBlob);
    const pdfResult = await doCompress(pdfURL);

    // download immediately pdfUrlResult
    pdfBlob = pdfResult.pdfBlob;
  }

  // check if name not endswith pdf then add .pdf
  if (!filename.endsWith(".pdf")) {
    filename = filename + ".pdf";
  }
  saveAs(pdfBlob, filename);
};

export default mergePDFHandler;
