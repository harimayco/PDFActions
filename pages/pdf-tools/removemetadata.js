import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import removeMetaDataHandler from "../../methods/removeMetaData";
import { DeleteOnlyExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

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
      triggerFireworks();
      toast.success("PDF metadata removed and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove PDF metadata");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Remove PDF Metadata Online - Scrub Privacy Tags | PDFActions</title>
        <meta
          name="description"
          content="Strip and remove all metadata, tracking tags, and author info from PDF files online for maximum document privacy using 100% open source browser tools."
        />
        <meta
          name="keywords"
          content="remove pdf metadata online, scrub pdf metadata, anonymize pdf, Open Source PDF Tools, strip pdf author"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/removemetadata" />
        <meta property="og:title" content="Remove PDF Metadata Online - Scrub Privacy Tags | PDFActions" />
        <meta
          property="og:description"
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
