import { imageToPDF, mergePDF, pdfArrayToBlob } from "pdf-actions";
import { saveAs } from "file-saver";

const imagesToPDFHandler = async (
  images,
  marginMillimeter = [0, 0, 0, 0],
  asMergedFile = false,
  options = {}
) => {
  const pageSize =
    options.pageSize ||
    (typeof document !== "undefined" ? document.getElementById("pageSize")?.value : "A4") ||
    "A4";
  const pageOrientation =
    options.pageOrientation ||
    (typeof document !== "undefined" ? document.getElementById("pageOrientation")?.value : "Portrait") ||
    "Portrait";
  const imagePosition =
    options.imagePosition ||
    (typeof document !== "undefined" ? document.getElementById("imagePosition")?.value : "Center") ||
    "Center";

  const filesToMerge = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (image.deleted) continue;

    let src = image.src;
    if (!src && image.file) {
      src = await image.file.arrayBuffer();
    }

    const degrees = image.degrees || 0;

    const imagePDF = await imageToPDF(
      src,
      pageSize,
      pageOrientation,
      imagePosition,
      degrees,
      marginMillimeter
    );

    if (asMergedFile) {
      filesToMerge.push(imagePDF);
    } else {
      const pdfFile = await imagePDF.save();
      const pdfBlob = pdfArrayToBlob(pdfFile);
      const originalName = image.name || `image-${i + 1}.jpg`;
      const baseName = originalName.replace(/\.[^/.]+$/, "");
      saveAs(pdfBlob, `${baseName}.pdf`);
    }
  }

  if (asMergedFile && filesToMerge.length > 0) {
    const mergedPDFFile = await (await mergePDF(filesToMerge)).save();
    const pdfBlob = pdfArrayToBlob(mergedPDFFile);
    saveAs(pdfBlob, "images.pdf");
  }
};

export default imagesToPDFHandler;
