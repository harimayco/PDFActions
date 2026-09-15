import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import rotatePDFHandler from "../../methods/rotatePDF";
import { RotateAndDeleteExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function Rotate() {
  const [files, setFiles] = useState([]);
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
      await rotatePDFHandler(files, true);
      triggerFireworks();
      toast.success("Rotated PDFs downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to rotate PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await rotatePDFHandler(files, false);
      triggerFireworks();
      toast.success("Rotated PDFs downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to rotate PDF");
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
      <LeftSideBoxRotation files={files} setFiles={setFiles} />
    </div>
  );

  return (
    <>
      <Head>
        <title>Rotate PDF Online - Free Open Source PDF Rotator | PDFActions</title>
        <meta
          name="description"
          content="Rotate PDF online for free. Permanently change PDF page orientation by 90, 180, or 270 degrees in batch with 100% client-side privacy."
        />
        <meta
          name="keywords"
          content="rotate pdf online, rotate pdf pages, turn pdf, Open Source PDF Tools, free pdf rotator, batch rotate pdf"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/rotate" />
        <meta property="og:title" content="Rotate PDF Online - Free Open Source PDF Rotator | PDFActions" />
        <meta
          property="og:description"
          content="Permanently orient PDF pages by 90, 180, or 270 degrees online with zero server uploads."
        />
      </Head>

      <ToolBanner
        title="Rotate PDF Documents"
        description="Permanently orient your PDF pages. Rotate individual documents or apply a batch 90° turn."
        badge="Rotate Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-purple"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Files to Rotate"
          subtitle="Select one or multiple PDF documents to rotate orientation"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          isProcessing={isProcessing}
          downloadButtonText="Rotate & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={RotateAndDeleteExtra}
        />
      )}
    </>
  );
}
