import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import flattenPDFFormHandler from "../../methods/flattenPDFFormHandler.js";
import FileRotateButtons from "../../components/PDFFile/FilePreviewButtons/FileRotateButtons";
import FileDeleteButton from "../../components/PDFFile/FilePreviewButtons/FileDeleteButton";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation";

export default function flattenForm() {
  const [files, setFiles] = useState([]);

  const onFileChange = async (e) => {
    setFiles([...e.target.files]);
  };

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-2 mb-2">
        <FileRotateButtons file={file} imageRef={imageRef} />
        <FileDeleteButton file={file} setDeleted={setDeleted} />
      </div>
    );
  };

  const LeftSideBoxExtra = () => {
    return (
      <>
        <button
          className="px-4 py-2 w-full bg-rose-700 rounded-sm text-md mt-2"
          onClick={() => flattenPDFFormHandler(files, false)}
        >
          Save as Individual Files
        </button>
        <LeftSideBoxRotation files={files} />
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Flatten PDF Forms</title>
      </Head>

      {/* Banner */}
      <div className="bg-rose-800 border-slate-400 border-t-2 border-dotted text-slate-200 flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-4xl font-medium leading-normal tracking-wide">
          Flatten PDF Forms
        </div>
        <div>Flatten Multiple PDF Forms in one go</div>
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
          downloadHandler={() => flattenPDFFormHandler(files, true)}
          LeftSideBoxExtra={LeftSideBoxExtra}
          FilePreviewExtra={FilePreviewExtra}
        />
      )}
    </div>
  );
}
