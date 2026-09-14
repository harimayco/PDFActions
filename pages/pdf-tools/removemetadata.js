import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import removeMetaDataHandler from "../../methods/removeMetaData";
import { DeleteOnlyExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";

export default function RemoveMetadata() {
  const [files, setFiles] = useState([]);
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

  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      await removeMetaDataHandler(files);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Remove PDF Metadata - PDFActions</title>
        <meta
          name="description"
          content="Scrub all author, creator, application, and date tags from your PDF document for privacy."
        />
      </Head>

      <ToolBanner
        title="Remove PDF Metadata"
        description="Strip away sensitive author, creator, software, and timestamp properties for complete document privacy."
        badge="Privacy Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-teal"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={false}
          title="Choose or Drop a PDF to Clean"
          subtitle="Select a PDF document to strip all hidden metadata"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: false }}
          isProcessing={isProcessing}
          downloadButtonText="Scrub Metadata & Download"
          downloadHandler={handleDownload}
          FilePreviewExtra={DeleteOnlyExtra}
        />
      )}
    </>
  );
}
