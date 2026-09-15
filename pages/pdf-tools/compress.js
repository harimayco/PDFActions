import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import { compressPDFHandler } from "../../methods/compressPDF";
import { DeleteOnlyExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideCompressOptions from "../../components/PDFFile/LeftSideBoxButtons/LeftSideCompressOptions.jsx";
import CompressionResultModal from "../../components/CompressionResultModal.jsx";

export default function Compress() {
  const [quality, setQuality] = useState("2");
  const [stripMetadata, setStripMetadata] = useState(true);
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalData, setModalData] = useState(null);

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
      await compressPDFHandler(
        files,
        quality,
        true,
        (stats) => {
          if (stats) {
            setModalData({
              title: "PDF Compressed Successfully!",
              ...stats,
            });
          }
        },
        stripMetadata
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await compressPDFHandler(
        files,
        quality,
        false,
        (stats) => {
          if (stats) {
            setModalData({
              title: "PDF Compressed Successfully!",
              ...stats,
            });
          }
        },
        stripMetadata
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLeftSideExtra = () => (
    <div className="flex flex-col gap-3">
      <LeftSideCompressOptions
        quality={quality}
        setQuality={setQuality}
        stripMetadata={stripMetadata}
        setStripMetadata={setStripMetadata}
      />
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleDownloadIndividual}
        className="clay-btn clay-btn-white w-full py-2.5 text-xs font-bold"
      >
        Download as Individual Files
      </button>
    </div>
  );

  return (
    <>
      <Head>
        <title>PDF Compress Online - Free Open Source PDF Compression | Ghostscript WASM</title>
        <meta
          name="description"
          content="Compress PDF online for free using Ghostscript WASM in your browser. Shrink PDF file sizes with preset or custom DPI with zero server uploads and complete privacy."
        />
        <meta
          name="keywords"
          content="pdf compress Online, compress PDF online, Ghostscript WASM, Open Source PDF Tools, reduce pdf size, open source pdf compress, client-side pdf compressor"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/compress" />
        <meta property="og:title" content="PDF Compress Online - Free Open Source PDF Compression | Ghostscript WASM" />
        <meta
          property="og:description"
          content="Compress PDF online for free using Ghostscript WASM in your browser. Shrink PDF file size with complete privacy."
        />
      </Head>

      <ToolBanner
        title="PDF Compress Online"
        description="Reduce PDF file sizes dramatically directly in your browser using Ghostscript WASM. Select preset or custom DPI with zero cloud uploads."
        badge="Ghostscript WASM"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-green"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Files to Compress"
          subtitle="Batch compress one or multiple PDFs with high-efficiency Ghostscript WASM"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={false}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          isProcessing={isProcessing}
          downloadButtonText="Compress & Download (ZIP)"
          downloadHandler={handleDownloadZip}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={DeleteOnlyExtra}
        />
      )}

      <CompressionResultModal
        isOpen={Boolean(modalData)}
        onClose={() => setModalData(null)}
        data={modalData}
      />
    </>
  );
}
