import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import addPageNumbersHandler from "../../methods/addPageNumbers";
import LeftSidePageNumbers from "../../components/PDFFile/LeftSideBoxButtons/LeftSidePageNumbers";
import { DeleteOnlyExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function AddPageNumbers() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState({
    firstPageNumber: 1,
    startingPage: 1,
    endingPage: 1,
    margin: "Recommended",
    position: "b-c",
    fontSize: 12,
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
      await addPageNumbersHandler(files, options);
      triggerFireworks();
      toast.success("Page numbers added and downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add page numbers");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLeftSideExtra = () => (
    <LeftSidePageNumbers
      options={options}
      setOptions={setOptions}
      file={files[0]}
    />
  );

  return (
    <>
      <Head>
        <title>Add Page Numbers to PDF Online - Number PDF Pages | PDFActions</title>
        <meta
          name="description"
          content="Stamp customized page numbers onto PDF pages online with customizable position, font size, and margins using 100% open source browser tools."
        />
        <meta
          name="keywords"
          content="add page numbers to pdf online, number pdf pages, paginate pdf, Open Source PDF Tools, free pdf page numbering"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/addpagenumbers" />
        <meta property="og:title" content="Add Page Numbers to PDF Online - Number PDF Pages | PDFActions" />
        <meta
          property="og:description"
          content="Number your PDF pages online with full control over placement, font, and margins."
        />
      </Head>

      <ToolBanner
        title="Add Page Numbers to PDF"
        description="Insert crisp page numbering into headers or footers with customizable margins, font sizes, and start pages."
        badge="Numbers Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-blue"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={false}
          title="Choose or Drop a PDF File"
          subtitle="Select a PDF document to insert custom page numbers"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: false }}
          isProcessing={isProcessing}
          downloadButtonText="Stamp Numbers & Download"
          downloadHandler={handleDownload}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={DeleteOnlyExtra}
        />
      )}
    </>
  );
}
