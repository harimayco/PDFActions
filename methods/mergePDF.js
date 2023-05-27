import { createPDF, rotatePDF, pdfArrayToBlob, mergePDF, resizePDF } from "pdf-actions";
import { saveAs } from "file-saver";
import {doCompress} from  "./compressPDF";
import getPDFPageCount from "../methods/getPDFPageCount";

const mergePDFHandler = async (files, filename, onStatusUpdate, isSuccess) => {

  const resizeSize = document.getElementById("resizeSize").value;
  const orientation = document.getElementById("orientation").value;
  const position = document.getElementById("position").value;
  const sameSize =  document.getElementById("sameSize").checked;
  const compress =  document.getElementById("compressPDF").checked;

  const pdfDocs = [];
  let totalPdfPages = 0; 
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.deleted) {
      continue;
    }

    let pdfFile = await createPDF.PDFDocumentFromFile(file);
    let pdfToBeAdded;

    if (sameSize) {
      onStatusUpdate("Resizing PDFs...");
      const resizedPDF = await resizePDF(
        pdfFile,
        resizeSize,
        orientation,
        position
      );
      pdfToBeAdded = resizedPDF;
      onStatusUpdate("Resizing PDFs... Done");
    } else {
      pdfToBeAdded = pdfFile;
    }


    if (file.degrees) {
      onStatusUpdate("Rotating PDFs...");
      pdfToBeAdded = await rotatePDF(pdfToBeAdded, file.degrees);
      onStatusUpdate("Rotating PDFs... Done");
    }
    
    totalPdfPages += await getPDFPageCount(file);
    
    pdfDocs.push(pdfToBeAdded);
  }
  onStatusUpdate("Merging PDFs...");
  const mergedPdfFile = await (await mergePDF(pdfDocs)).save();
  onStatusUpdate("Merging PDFs... Done");

  let pdfBlob = pdfArrayToBlob(mergedPdfFile);
  // check if name not endswith pdf then add .pdf
  if (!filename.endsWith(".pdf")) {
    filename = filename + ".pdf";
  }

  if(compress){
    //onStatusUpdate("Compressing PDFs...");
    //blob to url
    const pdfURL = window.URL.createObjectURL(pdfBlob);
    const pdfResult = await doCompress({pdfUrl:pdfURL, pdfFileName: filename}, (message,  progress) => {
      //check if message contains Page ${i} and get the number
      
      onStatusUpdate(message, progress);
      

      // console.log(message)
    });

    // download immediately pdfUrlResult
    pdfBlob = pdfResult.pdfBlob;
    onStatusUpdate("Compressing PDFs... Done");
  }

  
  onStatusUpdate("Downloading PDFs...");
  saveAs(pdfBlob, filename);
  onStatusUpdate("PDF successfully downloaded");
  isSuccess();
};

function getProgress(currentPage, totalPage) {
  // progress  0 to 1
  const progress = currentPage / totalPage;
  return progress;
}

export default mergePDFHandler;
