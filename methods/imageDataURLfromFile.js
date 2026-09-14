import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc =
    "/PDFActions/pdf.worker.min.js";
}

const imageDataURLFromFile = async (file, pageNumber = 1) => {
  const actualBlob = file instanceof Blob ? file : (file?.file || file);
  if (!actualBlob || typeof actualBlob.arrayBuffer !== "function") {
    throw new Error("Invalid file or blob provided to imageDataURLFromFile");
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
    const page = await doc.getPage(pageNumber);
    const scale = 1.0;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
    return canvas.toDataURL("image/jpeg", 0.85);
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

export default imageDataURLFromFile;
