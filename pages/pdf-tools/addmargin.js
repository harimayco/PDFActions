import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import addMarginHandler from "../../methods/addMargin";
import { RotateAndDeleteExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation";
import LeftSideMargin from "../../components/PDFFile/LeftSideBoxButtons/LeftSideMargin.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function AddMargin() {
  const [files, setFiles] = useState([]);
  const [marginMillimeter, setMarginMillimeter] = useState([0, 0, 0, 0]);
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
      await addMarginHandler(files, marginMillimeter, true);
      triggerFireworks();
      toast.success("PDFs with margins downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add margins to PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await addMarginHandler(files, marginMillimeter, false);
      triggerFireworks();
      toast.success("PDFs with margins downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add margins to PDF");
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
      <LeftSideMargin margin={marginMillimeter} setMargin={setMarginMillimeter} />
      <LeftSideBoxRotation files={files} setFiles={setFiles} />
    </div>
  );

  return (
    <>
      <Head>
        <title>Add Margins to PDF - PDFActions</title>
        <meta
          name="description"
          content="Pad PDF pages with custom millimeter-precise margins for printing and binding."
        />
      </Head>

      <ToolBanner
        title="Add Margin to PDF"
        description="Add precise border margins around pages in millimeters, centimeters, or inches."
        badge="Margin Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-coral"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Files to Add Margins"
          subtitle="Select PDF files to configure page margins"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          isProcessing={isProcessing}
          downloadButtonText="Add Margins & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={RotateAndDeleteExtra}
        />
      )}
    </>
  );
}
