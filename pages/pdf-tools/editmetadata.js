import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import editMetaDataHandler from "../../methods/editMetaData";
import LeftSideEditMetaData from "../../components/PDFFile/LeftSideBoxButtons/LeftSideEditMetaData";
import { DeleteOnlyExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";

export default function EditMetadata() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [metaDataOptions, setMetaDataOptions] = useState({
    title: "",
    subject: "",
    author: "",
    creator: "",
    producer: "",
    keywords: [],
    documentCreationDate: new Date().toISOString().substring(0, 10),
    documentModificationDate: new Date().toISOString().substring(0, 10),
  });

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
      await editMetaDataHandler(files, metaDataOptions);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLeftSideExtra = () => (
    <LeftSideEditMetaData
      metaDataOptions={metaDataOptions}
      setMetaDataOptions={setMetaDataOptions}
    />
  );

  return (
    <>
      <Head>
        <title>Edit PDF Metadata - PDFActions</title>
        <meta
          name="description"
          content="Edit title, author, subject, creator, and keyword tags embedded in your PDF document."
        />
      </Head>

      <ToolBanner
        title="Edit PDF Metadata"
        description="Inspect and modify internal title, author, creator, and keyword properties embedded in your PDF."
        badge="Metadata Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-purple"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={false}
          title="Choose or Drop a PDF to Edit Metadata"
          subtitle="Select a PDF file to customize title, author, and description attributes"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: false }}
          isProcessing={isProcessing}
          downloadButtonText="Update Metadata & Download"
          downloadHandler={handleDownload}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={DeleteOnlyExtra}
        />
      )}
    </>
  );
}
