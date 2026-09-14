import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import flattenPDFFormHandler from "../../methods/flattenPDFFormHandler.js";
import { RotateAndDeleteExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation";

export default function FlattenForm() {
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
      await flattenPDFFormHandler(files, true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await flattenPDFFormHandler(files, false);
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
        <title>Flatten PDF Forms - PDFActions</title>
        <meta
          name="description"
          content="Flatten interactive form inputs into permanent, immutable PDF text content."
        />
      </Head>

      <ToolBanner
        title="Flatten PDF Forms"
        description="Burn filled-in interactive form inputs permanently into non-editable PDF document layers."
        badge="Form Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-green"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Form Files"
          subtitle="Select PDF documents containing interactive form fields to flatten"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          isProcessing={isProcessing}
          downloadButtonText="Flatten & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={RotateAndDeleteExtra}
        />
      )}
    </>
  );
}
