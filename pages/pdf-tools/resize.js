import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import resizePDFHandler from "../../methods/resizePDF";
import { RotateAndDeleteExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideResizePDF from "../../components/PDFFile/LeftSideBoxButtons/LeftSideResizePDF.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function Resize() {
  const [files, setFiles] = useState([]);
  const [size, setSize] = useState("A4");
  const [orientation, setOrientation] = useState("Portrait");
  const [position, setPosition] = useState("Center");
  const [isProcessing, setIsProcessing] = useState(false);

  const onFileChange = async (e) => {
    const rawFiles = Array.from(e.target.files || []);
    if (rawFiles.length === 0) return;

    const enriched = rawFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      file,
      name: file.name,
      size: file.size,
      pageCount: null,
      degrees: 0,
    }));

    setFiles((prev) => [...prev, ...enriched]);
  };

  const handleDownloadZip = async () => {
    setIsProcessing(true);
    try {
      await resizePDFHandler(files, { size, orientation, position }, true);
      triggerFireworks();
      toast.success("Resized PDFs downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to resize PDF files");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await resizePDFHandler(files, { size, orientation, position }, false);
      triggerFireworks();
      toast.success("Resized PDFs downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to resize PDF files");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLeftSideExtra = () => (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleDownloadIndividual}
        className="clay-btn clay-btn-white w-full py-2.5 text-xs font-bold"
      >
        Download as Individual Files
      </button>
      <LeftSideResizePDF
        size={size}
        setSize={setSize}
        orientation={orientation}
        setOrientation={setOrientation}
        position={position}
        setPosition={setPosition}
      />
      <LeftSideBoxRotation files={files} setFiles={setFiles} />
    </div>
  );

  return (
    <>
      <Head>
        <title>Resize PDF Online - Standardize to A4, Letter & Legal | PDFActions</title>
        <meta
          name="description"
          content="Resize PDF page dimensions online for free. Standardize mixed page sizes to A4, US Letter, Legal, or Tabloid with 100% open source client-side privacy."
        />
        <meta
          name="keywords"
          content="resize pdf online, change pdf size, pdf to a4, Open Source PDF Tools, scale pdf pages, free pdf resize"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/resize" />
        <meta property="og:title" content="Resize PDF Online - Standardize to A4, Letter & Legal | PDFActions" />
        <meta
          property="og:description"
          content="Standardize PDF page sizes to A4, US Letter, Legal, or Tabloid online without cloud uploads."
        />
      </Head>

      <ToolBanner
        title="Resize PDF Documents"
        description="Re-standardize page canvas dimensions to A4, Letter, Legal, or Tabloid formats."
        badge="Resize Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-orange"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Files to Resize"
          subtitle="Select PDF files to standardize page dimensions"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          isProcessing={isProcessing}
          downloadButtonText="Resize & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={RotateAndDeleteExtra}
        />
      )}
    </>
  );
}
