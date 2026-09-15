import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import breakPDFHandler from "../../methods/breakPDF";
import { RotateAndDeleteExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideBreakPDF from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBreakPDF.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function Break() {
  const [files, setFiles] = useState([]);
  const [breakOptions, setBreakOptions] = useState({ maxPages: 1, includeLastPages: true });
  const [isProcessing, setIsProcessing] = useState(false);

  const onFileChange = async (e) => {
    const rawFiles = Array.from(e.target.files || []);
    if (rawFiles.length === 0) return;

    const enriched = rawFiles.slice(0, 1).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      file,
      name: file.name,
      size: file.size,
      pageCount: null,
      degrees: 0,
    }));

    setFiles(enriched);
  };

  const handleDownloadZip = async () => {
    setIsProcessing(true);
    try {
      await breakPDFHandler(files, true, breakOptions);
      triggerFireworks();
      toast.success("PDF broken and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to break PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await breakPDFHandler(files, false, breakOptions);
      triggerFireworks();
      toast.success("PDF broken and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to break PDF");
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
      <LeftSideBreakPDF
        file={files[0]}
        breakOptions={breakOptions}
        setBreakOptions={setBreakOptions}
      />
      <LeftSideBoxRotation files={files} setFiles={setFiles} />
    </div>
  );

  return (
    <>
      <Head>
        <title>Break PDF Online - Free Open Source PDF Chunking | PDFActions</title>
        <meta
          name="description"
          content="Break large PDF documents into smaller fixed page chunks online for free with 100% open source browser privacy."
        />
        <meta
          name="keywords"
          content="break pdf online, chunk pdf, slice pdf, Open Source PDF Tools, split pdf pages, free pdf break"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/break" />
        <meta property="og:title" content="Break PDF Online - Free Open Source PDF Chunking | PDFActions" />
        <meta
          property="og:description"
          content="Slice large PDF files into fixed-size chunks online with complete privacy."
        />
      </Head>

      <ToolBanner
        title="Break PDF Documents"
        description="Slice a large PDF document into manageable chunks with custom page limits."
        badge="Break Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-teal"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={false}
          title="Choose or Drop a PDF to Break"
          subtitle="Select a PDF document to slice into smaller page sets"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: false }}
          isProcessing={isProcessing}
          downloadButtonText="Break & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={RotateAndDeleteExtra}
        />
      )}
    </>
  );
}
