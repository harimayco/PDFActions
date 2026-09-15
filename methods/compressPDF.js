import { toast } from "react-toastify";
import { zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { triggerFireworks } from "../utils/confetti";

const doCompress = async ({ pdfUrl, pdfFileName, quality, resolution, stripMetadata = true }, onStatusUpdate = () => {}) => {
  if (typeof window === "undefined" || !window.Worker) {
    throw new Error("Web Workers are not supported in this environment");
  }

  const worker = new Worker(new URL("../lib/gsw.js", import.meta.url));
  const resolvedQuality = typeof quality === "object" && quality !== null ? (quality.quality || quality.preset) : quality;
  const resolvedResolution = typeof quality === "object" && quality !== null ? quality.resolution : resolution;
  const resolvedStripMetadata = typeof quality === "object" && quality !== null && quality.stripMetadata !== undefined
    ? quality.stripMetadata
    : stripMetadata;

  return new Promise((resolve, reject) => {
    worker.postMessage({
      pdfUrl,
      pdfFileName,
      quality: resolvedQuality,
      resolution: resolvedResolution,
      stripMetadata: resolvedStripMetadata,
    });

    worker.onmessage = ({ data: { status, message, pdfUrl: resultUrl, progress } }) => {
      if (status === "done") {
        worker.terminate();
        return resolve(resultUrl);
      }
      onStatusUpdate(message, progress);
    };

    worker.onerror = (err) => {
      worker.terminate();
      reject(err);
    };
  });
};

const compressPDFHandler = async (
  files,
  quality = "2",
  asZip = true,
  onSuccess = () => {},
  stripMetadata = true
) => {
  let zip;
  if (asZip) {
    zip = new JSZip();
  }

  const activeFiles = files.filter((f) => !f.deleted);
  if (activeFiles.length === 0) {
    toast.error("No valid PDF files to compress");
    return;
  }

  const promises = [];

  let totalCompressedSize = 0;
  let singleBlob = null;
  let singleFileName = "";

  for (let i = 0; i < activeFiles.length; i++) {
    const item = activeFiles[i];
    const rawFile = item.file || item;
    const pdfFileName = item.name || rawFile.name || `compressed-${i + 1}.pdf`;

    const pdfUrl = URL.createObjectURL(rawFile);
    let toastId = toast.loading(`Compressing ${pdfFileName}...`);

    const promise = doCompress({ pdfUrl, pdfFileName, quality, stripMetadata }, (currentStatus, progress = null) => {
      if (toastId !== null) {
        toast.update(toastId, {
          render: `${currentStatus}`,
          progress: progress,
          hideProgressBar: false,
        });
      }
    })
      .then((pdfResult) => {
        const pdfBlob = pdfResult?.pdfBlob || pdfResult;
        totalCompressedSize += pdfBlob.size;
        singleBlob = pdfBlob;
        singleFileName = `compressed-${pdfFileName}`;
        if (!asZip) {
          saveAs(pdfBlob, `compressed-${pdfFileName}`);
        } else {
          zip.file(`compressed-${pdfFileName}`, pdfBlob);
        }
        toast.update(toastId, {
          render: `${pdfFileName} Compressed Successfully`,
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      })
      .catch((err) => {
        console.error("Compression error:", err);
        toast.update(toastId, {
          render: `Error compressing ${pdfFileName}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .finally(() => {
        URL.revokeObjectURL(pdfUrl);
      });

    promises.push(promise);
  }

  try {
    await Promise.all(promises);
    const originalSize = activeFiles.reduce(
      (acc, f) => acc + (f.size || f.file?.size || 0),
      0
    );

    if (asZip) {
      const compressedFileName = "compressedPDFFiles.zip";
      const blob = await zipToBlob(zip);
      saveAs(blob, compressedFileName);
      toast.success(`${compressedFileName} Downloaded Successfully`);
      triggerFireworks(2800);
      if (onSuccess) {
        onSuccess({
          originalSize,
          outputSize: blob.size,
          filename: compressedFileName,
          blob,
        });
      }
    } else {
      triggerFireworks(2800);
      if (onSuccess) {
        onSuccess({
          originalSize,
          outputSize: totalCompressedSize,
          filename: singleFileName,
          blob: singleBlob,
        });
      }
    }
  } catch (error) {
    console.error("Batch compression error:", error);
    toast.error("There was an error while saving compressed files");
  }
};

export { compressPDFHandler, doCompress };