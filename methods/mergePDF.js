import { createPDF, rotatePDF, pdfArrayToBlob, mergePDF, resizePDF } from "pdf-actions";
import { saveAs } from "file-saver";
import { doCompress } from "./compressPDF";
import getPDFPageCount from "./getPDFPageCount";

const mergePDFHandler = async (
  files,
  filename = "merged.pdf",
  quality = "2",
  options = {},
  onStatusUpdate = () => {},
  isSuccess = () => {}
) => {
  // Read from options if provided, otherwise fallback to DOM
  const resizeSize =
    options.size || (typeof document !== "undefined" ? document.getElementById("resizeSize")?.value : "A4") || "A4";
  const orientation =
    options.orientation || (typeof document !== "undefined" ? document.getElementById("orientation")?.value : "Portrait") || "Portrait";
  const position =
    options.position || (typeof document !== "undefined" ? document.getElementById("position")?.value : "Center") || "Center";
  const sameSize =
    options.sameSize !== undefined
      ? options.sameSize
      : (typeof document !== "undefined" ? document.getElementById("sameSize")?.checked : false);
  const compress =
    options.compress !== undefined
      ? options.compress
      : (typeof document !== "undefined" ? document.getElementById("compressPDF")?.checked : false);
  const keepRatio =
    options.keepRatio !== undefined
      ? options.keepRatio
      : (typeof document !== "undefined" ? document.getElementById("keepRatio")?.checked : true);

  const pdfDocs = [];
  let totalPdfPages = 0;

  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (item.deleted) continue;

    const rawFile = item.file || item;
    const degrees = item.degrees || 0;

    let pdfFile = await createPDF.PDFDocumentFromFile(rawFile);
    let pdfToBeAdded;

    if (sameSize) {
      onStatusUpdate("Resizing PDFs...");
      const resizedPDF = await resizePDF(
        pdfFile,
        resizeSize,
        orientation,
        position,
        0,
        keepRatio
      );
      pdfToBeAdded = resizedPDF;
      onStatusUpdate("Resizing PDFs... Done");
    } else {
      pdfToBeAdded = pdfFile;
    }

    if (degrees) {
      onStatusUpdate("Rotating PDFs...");
      pdfToBeAdded = await rotatePDF(pdfToBeAdded, degrees);
      onStatusUpdate("Rotating PDFs... Done");
    }

    try {
      totalPdfPages += await getPDFPageCount(rawFile);
    } catch (e) {
      // ignore
    }

    pdfDocs.push(pdfToBeAdded);
  }

  if (pdfDocs.length === 0) {
    onStatusUpdate("No valid PDF files to merge.");
    return;
  }

  onStatusUpdate("Merging PDFs...");
  const mergedPdfFile = await (await mergePDF(pdfDocs)).save();
  onStatusUpdate("Merging PDFs... Done");

  let pdfBlob = pdfArrayToBlob(mergedPdfFile);

  if (!filename.endsWith(".pdf")) {
    filename = filename + ".pdf";
  }

  if (compress) {
    onStatusUpdate("Compressing merged PDF...");
    const pdfURL = window.URL.createObjectURL(pdfBlob);
    try {
      const pdfResult = await doCompress(
        { pdfUrl: pdfURL, pdfFileName: filename, quality },
        (message, progress) => {
          onStatusUpdate(message, progress);
        }
      );
      if (pdfResult?.pdfBlob) {
        pdfBlob = pdfResult.pdfBlob;
      }
      onStatusUpdate("Compressing PDFs... Done");
    } catch (compErr) {
      console.warn("Ghostscript compression failed or was skipped:", compErr);
      onStatusUpdate("Compression skipped, proceeding with merged PDF...");
    } finally {
      window.URL.revokeObjectURL(pdfURL);
    }
  }

  const originalSize = files.reduce(
    (acc, f) => acc + (f.size || f.file?.size || 0),
    0
  );

  onStatusUpdate("Downloading merged PDF...");
  saveAs(pdfBlob, filename);
  if (isSuccess) {
    isSuccess({
      originalSize,
      outputSize: pdfBlob.size,
      filename,
      blob: pdfBlob,
      compressed: Boolean(compress),
    });
  }
};

export default mergePDFHandler;
