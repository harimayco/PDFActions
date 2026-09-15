import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import splitPDFHandler from "../../methods/splitPDF";
import { SplitFilePreviewExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function Split() {
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
      splitRange: [1, 1],
      degrees: 0,
    }));

    setFiles((prev) => [...prev, ...enriched]);
  };

  const handleDownloadZip = async () => {
    setIsProcessing(true);
    try {
      await splitPDFHandler(files, true);
      triggerFireworks();
      toast.success("PDFs split and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to split PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await splitPDFHandler(files, false);
      triggerFireworks();
      toast.success("PDFs split and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to split PDF");
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
        <title>Split PDF Files - PDFActions</title>
        <meta
          name="description"
          content="Split and extract page ranges from PDF files with exact page control."
        />
      </Head>

      <ToolBanner
        title="Split PDF Documents"
        description="Extract specific page ranges or break multi-page documents into individual files."
        badge="Split Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-coral"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Files to Split"
          subtitle="Select PDF files to specify page ranges and extract pages"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          isProcessing={isProcessing}
          downloadButtonText="Split & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={SplitFilePreviewExtra}
        />
      )}
    </>
  );
}
