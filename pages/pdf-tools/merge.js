import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import mergePDFHandler from "../../methods/mergePDF";
import { RotateAndDeleteExtra } from "../../components/PDFFile/FilePreviewExtras.jsx";
import LeftSideResizePDF from "../../components/PDFFile/LeftSideBoxButtons/LeftSideResizePDF.jsx";
import LeftSideCompressOptions from "../../components/PDFFile/LeftSideBoxButtons/LeftSideCompressOptions.jsx";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation.jsx";
import CompressionResultModal from "../../components/CompressionResultModal.jsx";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function Merge() {
  const [files, setFiles] = useState([]);
  const [filename, setFilename] = useState("merged.pdf");
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Settings: defaulted to true per user requirements
  const [sameSize, setSameSize] = useState(true);
  const [size, setSize] = useState("A4");
  const [orientation, setOrientation] = useState("Portrait");
  const [position, setPosition] = useState("Center");
  const [keepRatio, setKeepRatio] = useState(true);

  const [compress, setCompress] = useState(true);
  const [quality, setQuality] = useState("2");

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

  const handleDownload = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    let toastId = toast.loading("Processing PDF files...");

    const options = {
      sameSize,
      size,
      orientation,
      position,
      keepRatio,
      compress,
    };

    try {
      await mergePDFHandler(
        files,
        filename,
        quality,
        options,
        (currentStatus, progress = null) => {
          if (toastId) {
            toast.update(toastId, {
              render: currentStatus,
              progress,
              hideProgressBar: progress === null,
            });
          }
        },
        (stats) => {
          toast.update(toastId, {
            render: `${filename} merged & downloaded!`,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          toastId = null;
          triggerFireworks(2800);
          if (stats) {
            setModalData({
              title: "PDF Merged Successfully!",
              ...stats,
            });
          }
        }
      );
    } catch (err) {
      console.error("Merge error:", err);
      toast.update(toastId, {
        render: "Failed to merge PDF files. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3500,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLeftSideExtra = () => (
    <div className="flex flex-col gap-4">
      {/* Same Size Resize Toggle */}
      <div className="p-3 bg-clay-bg rounded-2xl border border-slate-200">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            id="sameSize"
            name="sameSize"
            checked={sameSize}
            onChange={(e) => setSameSize(e.target.checked)}
            className="w-4 h-4 rounded text-clay-blue accent-clay-blue"
          />
          <span className="text-xs font-bold text-clay-heading">Standardize All Page Sizes</span>
        </label>
        {sameSize && (
          <div className="mt-3">
            <LeftSideResizePDF
              size={size}
              setSize={setSize}
              orientation={orientation}
              setOrientation={setOrientation}
              position={position}
              setPosition={setPosition}
            />
          </div>
        )}
      </div>

      {/* Compress Toggle */}
      <div className="p-3 bg-clay-bg rounded-2xl border border-slate-200">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            id="compressPDF"
            name="compress"
            checked={compress}
            onChange={(e) => setCompress(e.target.checked)}
            className="w-4 h-4 rounded text-clay-blue accent-clay-blue"
          />
          <span className="text-xs font-bold text-clay-heading">Compress Output File</span>
        </label>
        {compress && (
          <div className="mt-3">
            <LeftSideCompressOptions quality={quality} setQuality={setQuality} />
          </div>
        )}
      </div>

      {/* Batch Rotation */}
      <LeftSideBoxRotation files={files} setFiles={setFiles} />
    </div>
  );

  return (
    <>
      <Head>
        <title>Merge PDF Files - PDFActions</title>
        <meta
          name="description"
          content="Combine multiple PDF documents into a single sculpted file with custom ordering and rotation."
        />
      </Head>

      <ToolBanner
        title="Merge PDF Documents"
        description="Combine multiple PDFs into a single file. Drag cards to reorder, rotate pages, or standardize sizes."
        badge="Merge Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-blue"
      />

      {files.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
          title="Choose or Drop PDF Files to Merge"
          subtitle="Select 2 or more PDFs to combine into a single document"
        />
      ) : (
        <PDFFilesProcess
          files={files}
          setFiles={setFiles}
          sortableFilePreviewGrid={true}
          addFileOptions={{ fileType: ".pdf", multiple: true }}
          filename={filename}
          setFilename={setFilename}
          isProcessing={isProcessing}
          downloadButtonText="Merge & Download PDF"
          downloadHandler={handleDownload}
          LeftSideBoxExtra={renderLeftSideExtra}
          FilePreviewExtra={RotateAndDeleteExtra}
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
