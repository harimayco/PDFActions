import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc =
    "/PDFActions/pdf.worker.min.js";
}

const getPDFPageCount = async (file) => {
  const actualBlob = file instanceof Blob ? file : (file?.file || file);
  if (!actualBlob || typeof actualBlob.arrayBuffer !== "function") {
    return 1;
  }

  let doc = null;
  try {
    const arrayBuffer = await actualBlob.arrayBuffer();
    const loadingTask = getDocument({
      data: new Uint8Array(arrayBuffer),
      cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.10.377/cmaps/",
      cMapPacked: true,
    });
    doc = await loadingTask.promise;
    return doc.numPages;
  } catch (err) {
    console.warn("Could not read PDF page count:", err);
    return 1;
  } finally {
    if (doc) {
      try {
        doc.destroy();
      } catch (e) {
        // ignore cleanup error
      }
    }
  }
};

export default getPDFPageCount;
