import React, { useRef, useState } from "react";
import LeftSideBox from "../LeftSideBox";
import FilePreviewGrid from "./FilePreviewGrid";
import getPDFPageCount from "../../methods/getPDFPageCount";
export default function PDFFilesProcess({
  files,
  setFiles,
  filename,
  setFilename,
  sortableFilePreviewGrid,
  addFileOptions,
  downloadHandler,
  LeftSideBoxExtra,
  FilePreviewExtra,
}) {
  const inputButtonRef = useRef(null);

  const handleDeleteFilesClick = () => {
    setFiles([{ deleted: true }]);
  };
  const handleAddFileButtonClick = () => {
    inputButtonRef.current.click();
  };

  const onFileChange = async (e) => {
    const temp = [];
    const newFiles = e.target.files;

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      file.pageCount = await getPDFPageCount(file);
      temp.push(file);
    }

    setFiles([...files, ...temp]);
  };
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
    
  const onDropFiles = async (e) => {
    e.preventDefault();
    const newFiles = e.dataTransfer.files;
    const temp = [];
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      file.pageCount = await getPDFPageCount(file);
      temp.push(file);
    }
    setFiles([...files, ...temp]);
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hidden Input Tag for AddFile Button */}
      <input
        type="file"
        className="hidden"
        accept={addFileOptions.fileType}
        ref={inputButtonRef}
        multiple={addFileOptions.multiple}
        onChange={(e) => onFileChange(e)}
      />

      {/* PDF Box */}

      <div className="px-4 py-6 md:px-24 md:py-12 flex flex-col items-center md:items-start">
        {setFilename && (
          <>
            {/* Filename Input text with prepend filename: */}
            <div className="flex items-center mb-1 w-full md:w-1/3">
              <span className="text-black-200 text-s mr-4">Filename:</span>
              <input type="text" className="w-full text-slate-200 bg-gray-700 px-4 text-center py-4 rounded-sm" placeholder="Filename" value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>
          </>
        )}

       
        {/* Download Button */}
        <button
          className="md:w-1/3 w-full text-slate-200 bg-cyan-700 px-8 py-4 rounded-sm text-xl border-double border-4 border-sky-500"
          onClick={downloadHandler}
        >
          Save And Download
        </button>

        {/* Box Below Download Button */}
        <div className="flex flex-col md:flex-row w-full justify-between mt-6">
          {/* Left Side Box */}
          <LeftSideBox
            handleAddFileButtonClick={handleAddFileButtonClick}
            handleDeleteFilesClick={handleDeleteFilesClick}
            multiple={addFileOptions.multiple}
          >
            {LeftSideBoxExtra && <LeftSideBoxExtra />}
          </LeftSideBox>

          {/* Right Side Box / File Preview */}
          <div onDrop={onDropFiles} onDragOver={onDragOver} className="w-full md:w-2/3 p-4 border-rose-200 border-2 border-dashed">
            <FilePreviewGrid
              files={files}
              setFiles={setFiles}
              FilePreviewExtra={FilePreviewExtra}
              sortableFilePreviewGrid={sortableFilePreviewGrid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
