import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import { compressPDFHandler } from "../../methods/compressPDF";
import FileRotateButtons from "../../components/PDFFile/FilePreviewButtons/FileRotateButtons";
import FileDeleteButton from "../../components/PDFFile/FilePreviewButtons/FileDeleteButton";
import { toast } from 'react-toastify';

export default function compress() {
  const [files, setFiles] = useState([]);

  const onFileChange = async (e) => {
    setFiles([...e.target.files]);
  };

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-2 mb-2">
        <FileDeleteButton file={file} setDeleted={setDeleted} />
      </div>
    );
  };

  const LeftSideBoxExtra = () => {
    return (
      <>
        <button
          className="px-4 py-2 w-full bg-cyan-700 text-slate-200 rounded-sm text-md mt-2"
          onClick={async () => {
            let toastId = toast.loading('Processing PDF Files...');
            await compressPDFHandler(files, false);
          }}
        >
          Save as Individual Files
        </button>
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Compress PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-rose-800 border-slate-400 border-t-2 border-dotted text-slate-200 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Compress PDF
        </div>
        <div>Compress Multiple PDF Files in One Go</div>
      </div>

      {files.length === 0 && (
        <FileUploader
          onFileChange={onFileChange}
          fileType=".pdf"
          multiple={true}
        />
      )}
      {files.length !== 0 && (
        <PDFFilesProcess
          files={files}
          sortableFilePreviewGrid={false}
          setFiles={setFiles}
          addFileOptions={{
            fileType: ".pdf",
            multiple: true,
          }}
          downloadHandler={async () => {
            await compressPDFHandler(files, true);
          }}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );

  async function onStatusUpdate(toastId, currentStatus, progress = null) {
    setStatus(currentStatus);
    if (progress != null) {
      toast.update(toastId, { render: 'Compressing PDF Pages: ' + currentStatus, isLoading: true, progress: progress, hideProgressBar: false });
    }
  }
}
